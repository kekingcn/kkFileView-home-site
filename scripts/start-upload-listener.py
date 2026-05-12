#!/usr/bin/env python3
"""Start a one-shot upload receiver behind the kkview.cn Nginx proxy."""

from __future__ import annotations

import base64
import os
import sys

import winrm


LISTENER_SCRIPT = r"""
param(
  [Parameter(Mandatory=$true)][string]$OutputPath,
  [string]$Prefix = 'http://127.0.0.1:18081/'
)
$ErrorActionPreference = 'Stop'
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($Prefix)
$listener.Start()
try {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  if ($request.HttpMethod -ne 'PUT') {
    $response.StatusCode = 405
    $response.Close()
    exit 1
  }
  $dir = Split-Path -Parent $OutputPath
  if (!(Test-Path $dir)) {
    New-Item -Path $dir -ItemType Directory -Force | Out-Null
  }
  $file = [System.IO.File]::Create($OutputPath)
  try {
    $request.InputStream.CopyTo($file)
  } finally {
    $file.Close()
  }
  $bytes = [System.Text.Encoding]::UTF8.GetBytes('ok')
  $response.StatusCode = 201
  $response.OutputStream.Write($bytes, 0, $bytes.Length)
  $response.Close()
} finally {
  $listener.Stop()
  $listener.Close()
}
""".strip()


def require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise SystemExit(f"Missing required environment variable: {name}")
    return value


def ps_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def main() -> int:
    host = require_env("KKVIEW_WINRM_HOST")
    username = require_env("KKVIEW_WINRM_USERNAME")
    password = require_env("KKVIEW_WINRM_PASSWORD")
    output_path = require_env("KKVIEW_REMOTE_ZIP_PATH")
    port = os.environ.get("KKVIEW_WINRM_PORT") or "5985"
    transport = os.environ.get("KKVIEW_WINRM_TRANSPORT") or "ntlm"
    listener_port = os.environ.get("KKVIEW_UPLOAD_LISTENER_PORT") or "18081"
    listener_path = (
        os.environ.get("KKVIEW_UPLOAD_LISTENER_SCRIPT")
        or r"C:\nginx-1.26.2\conf\kkview-upload-listener.ps1"
    )

    encoded_script = base64.b64encode(LISTENER_SCRIPT.encode("utf-8")).decode("ascii")
    endpoint = f"http://{host}:{port}/wsman"
    session = winrm.Session(
        endpoint,
        auth=(username, password),
        transport=transport,
        operation_timeout_sec=60,
        read_timeout_sec=90,
    )
    script = rf"""
$ErrorActionPreference = 'Stop'
$listenerPath = {ps_quote(listener_path)}
$outputPath = {ps_quote(output_path)}
$listenerPort = {ps_quote(listener_port)}
$bytes = [System.Convert]::FromBase64String({ps_quote(encoded_script)})
[System.IO.File]::WriteAllBytes($listenerPath, $bytes)
Unregister-ScheduledTask -TaskName 'kkview-upload-listener' -Confirm:$false -ErrorAction SilentlyContinue
Get-CimInstance Win32_Process -Filter "name='powershell.exe'" |
  Where-Object {{ $_.CommandLine -like '*kkview-upload-listener.ps1*' }} |
  ForEach-Object {{ Invoke-CimMethod -InputObject $_ -MethodName Terminate | Out-Null }}
for ($i = 0; $i -lt 20; $i++) {{
  $busy = netstat -ano | Select-String (':{listener_port}\s')
  if (!$busy) {{
    break
  }}
  Start-Sleep -Milliseconds 500
}}
$argument = '-NoProfile -ExecutionPolicy Bypass -File "' + $listenerPath + '" -OutputPath "' + $outputPath + '" -Prefix "http://127.0.0.1:' + $listenerPort + '/"'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $argument
$trigger = New-ScheduledTaskTrigger -Once -At ((Get-Date).AddMinutes(10))
Register-ScheduledTask -TaskName 'kkview-upload-listener' -Action $action -Trigger $trigger -User 'SYSTEM' -RunLevel Highest -Force | Out-Null
Start-ScheduledTask -TaskName 'kkview-upload-listener'

$ready = $false
for ($i = 0; $i -lt 20; $i++) {{
  Start-Sleep -Milliseconds 500
  $listening = netstat -ano | Select-String (':{listener_port}\s')
  if ($listening) {{
    $ready = $true
    break
  }}
}}
if (!$ready) {{
  throw 'Upload listener did not start'
}}
Write-Output "Upload listener ready on 127.0.0.1:{listener_port}"
"""
    result = session.run_ps(script)
    stdout = result.std_out.decode("utf-8", "replace")
    stderr = result.std_err.decode("utf-8", "replace")
    if result.status_code != 0:
        print(stdout)
        print(stderr, file=sys.stderr)
        return result.status_code
    print(stdout)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
