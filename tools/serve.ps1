# =============================================================================
#  MEDIA WALL STUDIO - local preview server
# -----------------------------------------------------------------------------
#  The site works from file:// as well, but serving it over HTTP matches how it
#  will behave on a real host. Run from the project root:
#
#      powershell -ExecutionPolicy Bypass -File tools/serve.ps1
#
#  Then open http://localhost:8765  (Ctrl+C to stop)
# =============================================================================

param(
  [int] $Port = 0
)

# Port resolution, in order of precedence:
#   1. -Port passed explicitly on the command line
#   2. $env:PORT  - set by the editor's preview runner when it assigns a port
#   3. 8765       - the documented default for running this by hand
# Honouring PORT is what lets several chats/previews run at once without
# fighting over a single hardcoded port.
if ($Port -le 0) {
  if ($env:PORT -and [int]::TryParse($env:PORT, [ref]$null)) {
    $Port = [int]$env:PORT
  } else {
    $Port = 8765
  }
}

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$prefix = "http://localhost:$Port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try   { $listener.Start() }
catch { Write-Error "Could not bind $prefix - is something already using port $Port?"; exit 1 }

Write-Output "Serving $root"
Write-Output "  -> $prefix"
Write-Output "Press Ctrl+C to stop."

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json"
  ".jpg"  = "image/jpeg";  ".jpeg" = "image/jpeg"
  ".png"  = "image/png";   ".webp" = "image/webp"
  ".svg"  = "image/svg+xml"
  ".mp4"  = "video/mp4"
  ".ico"  = "image/x-icon"
  ".xml"  = "application/xml"
  ".txt"  = "text/plain; charset=utf-8"
  ".md"   = "text/plain; charset=utf-8"
}

while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq "") { $rel = "index.html" }

    $path = Join-Path $root $rel

    # Keep requests inside the project folder
    $full = [System.IO.Path]::GetFullPath($path)
    if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
      $ctx.Response.StatusCode = 403
      $ctx.Response.OutputStream.Close()
      continue
    }

    if (Test-Path -LiteralPath $full -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($full).ToLower()
      $ct = $mime[$ext]
      if (-not $ct) { $ct = "application/octet-stream" }

      $bytes = [System.IO.File]::ReadAllBytes($full)
      $ctx.Response.ContentType = $ct
      $ctx.Response.Headers.Add("Cache-Control", "no-cache")
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $b = [System.Text.Encoding]::UTF8.GetBytes("404 - $rel")
      $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    }

    $ctx.Response.OutputStream.Close()
  } catch { }
}
