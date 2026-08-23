$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8765/")
$listener.Start()
Write-Output "Serving $root at http://127.0.0.1:8765/"
$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".png"  = "image/png"
  ".gif"  = "image/gif"
  ".ico"  = "image/x-icon"
  ".svg"  = "image/svg+xml"
  ".woff" = "font/woff"
  ".woff2"= "font/woff2"
  ".ttf"  = "font/ttf"
  ".eot"  = "application/vnd.ms-fontobject"
}
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "index.html" }
  $path = Join-Path $root ($rel -replace "/", "\")
  if (Test-Path $path -PathType Container) { $path = Join-Path $path "index.html" }
  $fullRoot = (Resolve-Path $root).Path
  try { $fullFile = [System.IO.Path]::GetFullPath($path) } catch { $fullFile = "" }
  if (-not $fullFile.StartsWith($fullRoot) -or -not (Test-Path $fullFile -PathType Leaf)) {
    $ctx.Response.StatusCode = 404
    $buf = [Text.Encoding]::UTF8.GetBytes("404")
    $ctx.Response.OutputStream.Write($buf, 0, $buf.Length)
    $ctx.Response.Close()
    continue
  }
  $ext = [IO.Path]::GetExtension($fullFile).ToLowerInvariant()
  $ctx.Response.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" })
  $bytes = [IO.File]::ReadAllBytes($fullFile)
  $ctx.Response.ContentLength64 = $bytes.Length
  $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $ctx.Response.Close()
}
