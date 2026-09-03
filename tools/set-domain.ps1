# =============================================================================
#  MEDIA WALL STUDIO - set the live domain
# -----------------------------------------------------------------------------
#  The canonical tag, Open Graph URL, JSON-LD url and every sitemap entry must
#  point at the address the site is ACTUALLY served from. If they point
#  somewhere else, Google treats that other address as the real page and your
#  live site may never rank.
#
#  Run this once, right after you know your final URL:
#
#      powershell -ExecutionPolicy Bypass -File tools/set-domain.ps1 -Domain "https://your-site.netlify.app"
#      powershell -ExecutionPolicy Bypass -File tools/set-domain.ps1 -Domain "https://mediawallstudio.ae"
#
#  Safe to run again later when you move to a custom domain.
#  Add -WhatIf to preview the changes without writing anything.
# =============================================================================

param(
  [Parameter(Mandatory = $true)]
  [string] $Domain,

  [switch] $WhatIf
)

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

# Normalise: force https, strip any trailing slash
$Domain = $Domain.Trim()
if ($Domain -notmatch '^https?://') { $Domain = "https://$Domain" }
$Domain = $Domain -replace '^http://', 'https://'
$Domain = $Domain.TrimEnd('/')

# Matches whatever domain is currently in the files, so this works repeatedly
$pattern = 'https://[A-Za-z0-9\.\-]+(?:\.[A-Za-z]{2,}|:\d+)'

$targets = @('index.html', 'sitemap.xml', 'robots.txt')
$totalHits = 0

foreach ($name in $targets) {
  $path = Join-Path $root $name
  if (-not (Test-Path -LiteralPath $path)) { continue }

  $text = Get-Content -LiteralPath $path -Raw -Encoding UTF8
  $original = $text

  # Only rewrite our own site URLs. Never touch ImageKit, Google Fonts,
  # WhatsApp, schema.org or any other third-party address.
  $skip = 'ik\.imagekit\.io|fonts\.(googleapis|gstatic)\.com|wa\.me|schema\.org|sitemaps\.org|www\.w3\.org'

  $text = [regex]::Replace($text, $pattern, {
    param($m)
    if ($m.Value -match $skip) { return $m.Value }
    $script:totalHits++
    return $Domain
  })

  if ($text -ne $original) {
    if ($WhatIf) {
      Write-Output "would update: $name"
    } else {
      # UTF8 without BOM, so the HTML stays byte-clean
      [System.IO.File]::WriteAllText($path, $text, (New-Object System.Text.UTF8Encoding($false)))
      Write-Output "updated: $name"
    }
  } else {
    Write-Output "no change: $name"
  }
}

Write-Output ""
Write-Output "Site URL set to: $Domain"
Write-Output "References rewritten: $totalHits"
if ($WhatIf) { Write-Output "(preview only - nothing was written)" }
