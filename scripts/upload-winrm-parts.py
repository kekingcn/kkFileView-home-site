#!/usr/bin/env python3
"""Upload package parts to a Windows host over PSRP/WinRM."""

from __future__ import annotations

import argparse
import glob
import os
import pathlib
import sys

import winrm
from pypsrp.client import Client


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise SystemExit(f"Missing required environment variable: {name}")
    return value


def ps_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--parts-glob", required=True)
    parser.add_argument("--remote-parts-dir", required=True)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    parts = [pathlib.Path(item).resolve() for item in sorted(glob.glob(args.parts_glob))]
    if not parts:
        raise SystemExit(f"No parts matched: {args.parts_glob}")

    host = require_env("KKVIEW_WINRM_HOST")
    username = require_env("KKVIEW_WINRM_USERNAME")
    password = require_env("KKVIEW_WINRM_PASSWORD")
    port = os.environ.get("KKVIEW_WINRM_PORT") or "5985"
    transport = os.environ.get("KKVIEW_WINRM_TRANSPORT") or "ntlm"
    max_envelope_size = int(os.environ.get("KKVIEW_WINRM_MAX_ENVELOPE") or "450000")

    endpoint = f"http://{host}:{port}/wsman"
    session = winrm.Session(
        endpoint,
        auth=(username, password),
        transport=transport,
        operation_timeout_sec=60,
        read_timeout_sec=90,
    )
    prep = rf"""
$ErrorActionPreference = 'Stop'
$partsDir = {ps_quote(args.remote_parts_dir)}
if (Test-Path $partsDir) {{
  Remove-Item -Path $partsDir -Recurse -Force
}}
New-Item -Path $partsDir -ItemType Directory -Force | Out-Null
Write-Output "Prepared parts dir: $partsDir"
"""
    result = session.run_ps(prep)
    if result.status_code != 0:
        print(result.std_out.decode("utf-8", "replace"))
        print(result.std_err.decode("utf-8", "replace"), file=sys.stderr)
        return result.status_code

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
        read_timeout=120,
        max_envelope_size=max_envelope_size,
    )

    for index, part in enumerate(parts, start=1):
        remote_path = args.remote_parts_dir.rstrip("\\/") + "\\" + part.name
        copied_to = client.copy(str(part), remote_path)
        print(f"Uploaded {index}/{len(parts)}: {copied_to}", flush=True)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
