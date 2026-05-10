# ──────────────────────────────────────────────────────────────────
# Deploy-ToCDN.ps1
# ──────────────────────────────────────────────────────────────────
# Sync build/web-mobile/assets/* + AssetBundleVersion.json len CDN folder.
# Dung sau khi build + Generate-AssetBundleVersion.ps1.
#
# CACH CHAY:
#   .\Deploy-ToCDN.ps1
#     → Auto-detect build, deploy len C:\IIS\CDN\res
#
#   .\Deploy-ToCDN.ps1 -BuildPath "..." -CdnPath "C:\IIS\CDN\res"
#
#   .\Deploy-ToCDN.ps1 -DryRun
#     → Chi xem se copy gi, khong copy
#
# QUY TRINH BUILD + DEPLOY DAY DU:
#   1. Cocos Creator → Build → Web Mobile → Build.
#   2. .\Generate-AssetBundleVersion.ps1
#   3. .\Deploy-ToCDN.ps1
#   4. Copy build\web-mobile\index.html + main.js + cocos2d-js.js → C:\IIS\Game\
#      (main package, KHONG di kem CDN)
# ──────────────────────────────────────────────────────────────────
[CmdletBinding()]
param(
    [string]$BuildPath = '',
    [string]$CdnPath = 'C:\IIS\CDN\res',
    [switch]$DryRun,
    [switch]$Clean   # Xoa CDN folder truoc khi copy (chac chan sach)
)

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
    Write-Host "Khong tim thay build folder." -ForegroundColor Red
    exit 1
}

$srcAssets = Join-Path $BuildPath 'assets'
$srcVersion = Join-Path $BuildPath 'AssetBundleVersion.json'

if (-not (Test-Path $srcAssets)) {
    Write-Host "Khong tim thay $srcAssets" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $srcVersion)) {
    Write-Host "WARNING: $srcVersion khong ton tai!" -ForegroundColor Yellow
    Write-Host "         Chay Generate-AssetBundleVersion.ps1 truoc." -ForegroundColor Yellow
    if (-not $DryRun) {
        $confirm = Read-Host "Tiep tuc deploy KHONG co AssetBundleVersion.json? (y/N)"
        if ($confirm -ne 'y') { exit 1 }
    }
}

$dstAssets = Join-Path $CdnPath 'assets'
$dstVersion = Join-Path $CdnPath 'AssetBundleVersion.json'

Write-Host ""
Write-Host "Source:  $srcAssets" -ForegroundColor Cyan
Write-Host "Target:  $dstAssets" -ForegroundColor Cyan
if ($DryRun) { Write-Host "*** DRY RUN ***" -ForegroundColor Yellow }
Write-Host ""

if ($Clean -and (Test-Path $dstAssets)) {
    Write-Host "Cleaning $dstAssets ..." -ForegroundColor Yellow
    if (-not $DryRun) {
        Remove-Item -Path $dstAssets -Recurse -Force
    }
}

# Robocopy de copy nhanh + verify (mirror mode neu Clean da xoa)
$robocopyArgs = @(
    "`"$srcAssets`"",
    "`"$dstAssets`"",
    '/E',          # Subdirs (include empty)
    '/COPY:DAT',   # Data, Attributes, Timestamps (KHONG copy ACL)
    '/R:2',        # Retry 2
    '/W:1',        # Wait 1s
    '/MT:8',       # Multi-thread 8
    '/NFL',        # No file list
    '/NDL',        # No dir list
    '/NJH',        # No job header
    '/NJS'         # No job summary
)

if ($DryRun) { $robocopyArgs += '/L' }   # List only

Write-Host "Copying assets via robocopy..." -ForegroundColor Cyan
$rcOutput = & robocopy.exe @robocopyArgs
$rcExit = $LASTEXITCODE

# Robocopy exit code <8 = success
if ($rcExit -ge 8) {
    Write-Host "robocopy FAIL (exit=$rcExit)" -ForegroundColor Red
    Write-Host $rcOutput
    exit 1
}

# Copy AssetBundleVersion.json (overwrite)
if (Test-Path $srcVersion) {
    if ($DryRun) {
        Write-Host "[DRYRUN] copy: $srcVersion → $dstVersion" -ForegroundColor Gray
    } else {
        Copy-Item -Path $srcVersion -Destination $dstVersion -Force
        Write-Host "Copied AssetBundleVersion.json" -ForegroundColor Green
    }
}

if (-not $DryRun) {
    $dstSize = (Get-ChildItem $dstAssets -Recurse -File | Measure-Object -Property Length -Sum).Sum
    Write-Host ""
    Write-Host ("Deploy done. CDN size: {0:N1} MB" -f ($dstSize / 1MB)) -ForegroundColor Green
}
