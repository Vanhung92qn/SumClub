# ──────────────────────────────────────────────────────────────────
# Generate-AssetBundleVersion.ps1
# ──────────────────────────────────────────────────────────────────
# Quet thu muc build/web-mobile/assets/ → tao AssetBundleVersion.json
# de BundleControl client biet hash + URL cua tung bundle.
#
# CACH CHAY:
#   .\Generate-AssetBundleVersion.ps1
#     → Tu dong tim build folder dau tien tim thay
#
#   .\Generate-AssetBundleVersion.ps1 -BuildPath "C:\Server\Client\build\web-mobile"
#     → Chi dinh path build cu the
#
#   .\Generate-AssetBundleVersion.ps1 -CdnUrl "https://res.bay789x.me"
#     → Override CDN URL (mac dinh https://res.bay789x.me)
#
# OUTPUT:
#   <build>/AssetBundleVersion.json
#   {
#     "lobby":   { "hash": "abcd1", "url": "https://res.bay789x.me/assets/lobby" },
#     "common":  { "hash": "ef234", "url": "https://res.bay789x.me/assets/common" },
#     ...
#   }
# ──────────────────────────────────────────────────────────────────
[CmdletBinding()]
param(
    [string]$BuildPath = '',
    [string]$CdnUrl = 'https://res.bay789x.me'
)

# Auto-detect build path neu khong dua
if (-not $BuildPath) {
    $candidates = @(
        'C:\Server\Client\build\web-mobile',
        'C:\SumClub\build\web-mobile'
    )
    foreach ($c in $candidates) {
        if (Test-Path $c) { $BuildPath = $c; break }
    }
}

if (-not $BuildPath -or -not (Test-Path $BuildPath)) {
    Write-Host "Khong tim thay build folder. Build web-mobile truoc, hoac dua -BuildPath." -ForegroundColor Red
    exit 1
}

$assetsRoot = Join-Path $BuildPath 'assets'
if (-not (Test-Path $assetsRoot)) {
    Write-Host "Khong thay folder assets/ trong build: $assetsRoot" -ForegroundColor Red
    exit 1
}

Write-Host "Build path: $BuildPath" -ForegroundColor Cyan
Write-Host "CDN URL:    $CdnUrl" -ForegroundColor Cyan
Write-Host ""

$result = [ordered]@{}
$cdnUrlClean = $CdnUrl.TrimEnd('/')

# Quet tung subfolder trong assets/ → tim file config.<hash>.json
$bundleFolders = Get-ChildItem -Path $assetsRoot -Directory | Sort-Object Name

foreach ($folder in $bundleFolders) {
    $bundleName = $folder.Name

    # Cocos Creator 2.4 build voi md5Cache=true:
    # config file dang config.<5-char-hash>.json
    $configFiles = Get-ChildItem -Path $folder.FullName -Filter 'config.*.json' -File -ErrorAction SilentlyContinue
    if (-not $configFiles -or $configFiles.Count -eq 0) {
        # Fallback: config.json (md5Cache=false)
        $plain = Get-ChildItem -Path $folder.FullName -Filter 'config.json' -File -ErrorAction SilentlyContinue
        if ($plain) {
            $result[$bundleName] = [ordered]@{
                hash = ''
                url = "$cdnUrlClean/assets/$bundleName"
            }
            Write-Host ("{0,-25} (no md5Cache, plain config)" -f $bundleName) -ForegroundColor Yellow
        } else {
            Write-Host ("{0,-25} ! KHONG TIM THAY config.json - skip" -f $bundleName) -ForegroundColor Red
        }
        continue
    }

    # Trich hash tu ten file: config.<hash>.json
    $hash = $configFiles[0].BaseName -replace '^config\.', ''
    $result[$bundleName] = [ordered]@{
        hash = $hash
        url = "$cdnUrlClean/assets/$bundleName"
    }
    Write-Host ("{0,-25} hash={1}" -f $bundleName, $hash) -ForegroundColor Green
}

if ($result.Count -eq 0) {
    Write-Host "Khong tim thay bundle nao. Xac nhan da build web-mobile." -ForegroundColor Red
    exit 1
}

# Save JSON
$outputPath = Join-Path $BuildPath 'AssetBundleVersion.json'
$json = $result | ConvertTo-Json -Depth 5 -Compress
[System.IO.File]::WriteAllText($outputPath, $json, [System.Text.UTF8Encoding]::new($false))

Write-Host ""
Write-Host "Generated: $outputPath" -ForegroundColor Cyan
Write-Host "Total bundles: $($result.Count)" -ForegroundColor Cyan
