# =============================================================================
#  MEDIA WALL STUDIO - responsive image builder
# -----------------------------------------------------------------------------
#  Regenerates the -480 / -900 / -1400 web derivatives that the site actually
#  loads. Run it whenever you add or replace a photograph.
#
#  1. Put your full-size photo in this folder with the final web name, e.g.
#         assets/img/project-03-dark-luxury.jpg
#  2. From the project root run:
#         powershell -ExecutionPolicy Bypass -File tools/resize-images.ps1
#  3. The script writes the three derivatives and DELETES the full-size file
#     from assets/img (pass -KeepOriginals to keep it).
#
#  Uses System.Drawing, which ships with Windows - nothing to install.
# =============================================================================

param(
  [string] $ImageDir      = "assets\img",
  [switch] $KeepOriginals
)

Add-Type -AssemblyName System.Drawing

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq 'image/jpeg' }

# width => JPEG quality
#
# Keys are STRINGS deliberately. On an [ordered] hashtable an integer index
# is positional, not a key lookup, so $targets[480] returned $null, [int64]
# $null came out as 0, and every derivative was written at JPEG quality 0 -
# maximum compression. It went unnoticed while ImageKit was re-encoding from
# its own copy and these files were never actually served.
$targets = [ordered]@{ '480' = 82; '900' = 84; '1400' = 86 }

if (-not (Test-Path $ImageDir)) {
  Write-Error "Image directory not found: $ImageDir  (run this from the project root)"
  exit 1
}

$sources = Get-ChildItem "$ImageDir\*.jpg" |
           Where-Object { $_.Name -notmatch '-(480|900|1400|1800)\.jpg$' }

if (-not $sources) {
  Write-Output "Nothing to do - no full-size .jpg files found in $ImageDir."
  exit 0
}

foreach ($file in $sources) {
  $img = [System.Drawing.Image]::FromFile($file.FullName)
  Write-Output "$($file.Name)  ($($img.Width)x$($img.Height))"

  foreach ($key in $targets.Keys) {
    $width = [int]$key
    $tw = [Math]::Min($width, $img.Width)
    $th = [int][Math]::Round($img.Height * ($tw / $img.Width))

    $bmp = New-Object System.Drawing.Bitmap($tw, $th)
    $bmp.SetResolution(72, 72)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CompositingQuality = 'HighQuality'
    $g.InterpolationMode  = 'HighQualityBicubic'
    $g.SmoothingMode      = 'HighQuality'
    $g.PixelOffsetMode    = 'HighQuality'
    $g.DrawImage($img, 0, 0, $tw, $th)
    $g.Dispose()

    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                      [System.Drawing.Imaging.Encoder]::Quality,
                      [int64]$targets[$key])

    $out = Join-Path $ImageDir ($file.BaseName + "-$width.jpg")
    $bmp.Save($out, $codec, $ep)
    $bmp.Dispose(); $ep.Dispose()

    Write-Output ("   -> {0}  {1:N0} KB" -f (Split-Path $out -Leaf), ((Get-Item $out).Length / 1KB))
  }

  $img.Dispose()

  if (-not $KeepOriginals) {
    Remove-Item -LiteralPath $file.FullName -Force
    Write-Output "   removed full-size original from the web folder"
  }
}

Write-Output ""
Write-Output "Done. Keep your full-size masters somewhere outside assets/img."
