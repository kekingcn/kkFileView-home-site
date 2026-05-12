#!/usr/bin/env python3
"""Deploy a built dist.zip to a Windows host over WinRM."""

from __future__ import annotations

import argparse
import os
import pathlib
import sys
import time

import winrm
from pypsrp.client import Client


DEFAULT_REMOVE_PATHS = (
    "assets",
    "build",
    "img",
    "docs",
    "blog",
    "zh-cn",
    "en-us",
    "md_json",
    "node_modules",
    "index.html",
    "404.html",
)


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise SystemExit(f"Missing required environment variable: {name}")
    return value


def ps_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def run_ps(session: winrm.Session, script: str, label: str) -> str:
    result = session.run_ps(script)
    stdout = result.std_out.decode("utf-8", "replace")
    stderr = result.std_err.decode("utf-8", "replace")
    if result.status_code != 0:
        raise RuntimeError(
            f"{label} failed with exit code {result.status_code}\n"
            f"STDOUT:\n{stdout}\nSTDERR:\n{stderr}"
        )
    return stdout


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--artifact",
        default="dist.zip",
        help="Zip file containing the dist directory.",
    )
    parser.add_argument("--chunk-size", type=int, help=argparse.SUPPRESS)
    parser.add_argument(
        "--remove-paths",
        default=",".join(DEFAULT_REMOVE_PATHS),
        help="Comma-separated paths to remove from deploy root before copying.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    artifact = pathlib.Path(args.artifact).resolve()
    if not artifact.is_file():
        raise SystemExit(f"Artifact does not exist: {artifact}")

    host = require_env("KKVIEW_WINRM_HOST")
    username = require_env("KKVIEW_WINRM_USERNAME")
    password = require_env("KKVIEW_WINRM_PASSWORD")
    deploy_path = require_env("KKVIEW_DEPLOY_PATH")
    port = os.environ.get("KKVIEW_WINRM_PORT") or "5985"
    transport = os.environ.get("KKVIEW_WINRM_TRANSPORT") or "ntlm"
    remote_temp = os.environ.get(
        "KKVIEW_REMOTE_TEMP",
        rf"C:\Windows\Temp\kkview-home-site-{int(time.time())}",
    )
    max_envelope_size = int(os.environ.get("KKVIEW_WINRM_MAX_ENVELOPE") or "450000")

    endpoint = f"http://{host}:{port}/wsman"
    session = winrm.Session(
        endpoint,
        auth=(username, password),
        transport=transport,
        operation_timeout_sec=60,
        read_timeout_sec=90,
    )

    remote_temp_q = ps_quote(remote_temp)
    remote_zip = remote_temp + r"\dist.zip"

    run_ps(
        session,
        rf"""
$ErrorActionPreference = 'Stop'
if (Test-Path {remote_temp_q}) {{ Remove-Item -Path {remote_temp_q} -Recurse -Force }}
New-Item -Path {remote_temp_q} -ItemType Directory -Force | Out-Null
Write-Output "Prepared remote temp: {remote_temp}"
""",
        "prepare remote temp",
    )

    ssl = (os.environ.get("KKVIEW_WINRM_SSL") or "").lower() in {
        "1",
        "true",
        "yes",
    } or port == "5986"
    client = Client(
        host,
        username=username,
        password=password,
        ssl=ssl,
        port=int(port),
        auth=transport,
        operation_timeout=60,
        read_timeout=90,
        max_envelope_size=max_envelope_size,
    )
    copied_to = client.copy(str(artifact), remote_zip)
    print(f"Uploaded artifact to {copied_to}", flush=True)

    remove_paths = [
        item.strip()
        for item in args.remove_paths.split(",")
        if item.strip()
    ]
    remove_paths_ps = "@(" + ",".join(ps_quote(item) for item in remove_paths) + ")"
    deploy_path_q = ps_quote(deploy_path)

    output = run_ps(
        session,
        rf"""
$ErrorActionPreference = 'Stop'
$deployPath = {deploy_path_q}
$remoteTemp = {remote_temp_q}
$zipPath = Join-Path $remoteTemp 'dist.zip'
$extractPath = Join-Path $remoteTemp 'extract'

if (!(Test-Path $deployPath)) {{
  throw "Deploy path does not exist: $deployPath"
}}

if (Test-Path $extractPath) {{ Remove-Item -Path $extractPath -Recurse -Force }}
New-Item -Path $extractPath -ItemType Directory -Force | Out-Null
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $extractPath)

$distPath = Join-Path $extractPath 'dist'
if (!(Test-Path $distPath)) {{
  $distPath = $extractPath
}}

$backupRoot = Join-Path (Split-Path $deployPath -Parent) '_kkview_backups'
New-Item -Path $backupRoot -ItemType Directory -Force | Out-Null
$backupPath = Join-Path $backupRoot ("kkview-" + (Get-Date -Format 'yyyyMMddHHmmss') + ".zip")
[System.IO.Compression.ZipFile]::CreateFromDirectory($deployPath, $backupPath)

foreach ($name in {remove_paths_ps}) {{
  $target = Join-Path $deployPath $name
  if (Test-Path $target) {{
    Remove-Item -Path $target -Recurse -Force
  }}
}}

Copy-Item -Path (Join-Path $distPath '*') -Destination $deployPath -Recurse -Force
Remove-Item -Path $remoteTemp -Recurse -Force

Write-Output "Deploy path: $deployPath"
Write-Output "Backup path: $backupPath"
Write-Output "Published files:"
Get-ChildItem -Path $deployPath | Select-Object Name, LastWriteTime | Format-Table -AutoSize | Out-String
""",
        "deploy artifact",
    )
    print(output)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(1)
