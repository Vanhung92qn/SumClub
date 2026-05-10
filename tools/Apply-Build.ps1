# ──────────────────────────────────────────────────────────────────
# Apply-Build.ps1
# ──────────────────────────────────────────────────────────────────
# All-in-one script chay TREN SERVER sau khi user upload build folder.
# Tu dong:
#   1. Generate AssetBundleVersion.json (neu chua co)
#   2. Deploy assets + JSON -> C:\IIS\CDN\res
#   3. Copy main package (index.html + .js + splash + .css) -> C:\IIS\Game
#
# CACH DUNG:
#   1. Tren LOCAL: build trong Cocos Creator -> output C:\SumClub\build\web-mobile
#   2. Upload folder web-mobile len server (RDP drag, WinSCP, OneDrive, ...)
#      Vd: C:\Temp\build (chua subfolder assets/, index.html, ...)
#   3. Tren SERVER:
#        cd C:\Server\Client\tools
#        .\Apply-Build.ps1 -BuildPath "C:\Temp\build"
#
# OPTIONS:
#   -BuildPath "C:\Temp\build"    Path folder build da upload (bat buoc)
#   -CdnPath "C:\IIS\CDN\res"     CDN folder (default)
#   -GamePath "C:\IIS\Game"       Main package folder (default)
#   -SkipBackup                    KHONG backup C:\IIS\Game truoc khi deploy
#   -DryRun                       Xem se lam gi, khong copy
# ──────────────────────────────────────────────────────────────────
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$BuildPath,
    [string]$CdnPath = 'C:\IIS\CDN\res',
    [string]$GamePath = 'C:\IIS\Game',
    [switch]$SkipBackup,
    [switch]$DryRun
)

if (-not (Test-Path $BuildPath)) {
    Write-Host "ERROR: Khong tim thay $BuildPath" -ForegroundColor Red
    exit 1
}

$srcAssets = Join-Path $BuildPath 'assets'
if (-not (Test-Path $srcAssets)) {
    Write-Host "ERROR: $srcAssets khong ton tai. Build folder phai co subfolder assets/." -ForegroundColor Red
    exit 1
}

$indexHtml = Join-Path $BuildPath 'index.html'
if (-not (Test-Path $indexHtml)) {
    Write-Host "ERROR: $indexHtml khong ton tai. Day co phai folder build web-mobile?" -ForegroundColor Red
    exit 1
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  APPLY-BUILD" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Build:  $BuildPath" -ForegroundColor White
Write-Host "CDN:    $CdnPath" -ForegroundColor White
Write-Host "Main:   $GamePath" -ForegroundColor White
if ($DryRun) { Write-Host "MODE:   DRY RUN" -ForegroundColor Yellow }
Write-Host ""

# ─── Step 1: Generate AssetBundleVersion.json ───────────────────────
$jsonPath = Join-Path $BuildPath 'AssetBundleVersion.json'
if (-not (Test-Path $jsonPath)) {
    Write-Host "[1/3] Generate AssetBundleVersion.json..." -ForegroundColor Cyan
    if ($DryRun) {
        Write-Host "      [DRYRUN] would run Generate-AssetBundleVersion.ps1" -ForegroundColor Gray
    } else {
        & (Join-Path $scriptDir 'Generate-AssetBundleVersion.ps1') -BuildPath $BuildPath
        if (-not (Test-Path $jsonPath)) {
            Write-Host "ERROR: Generate failed, JSON khong duoc tao." -ForegroundColor Red
            exit 1
        }
    }
} else {
    Write-Host "[1/3] AssetBundleVersion.json da ton tai (skip generate)" -ForegroundColor Green
}

# ─── Step 2: Deploy assets + JSON -> CDN ────────────────────────────
Write-Host ""
Write-Host "[2/3] Deploy assets -> CDN..." -ForegroundColor Cyan
if ($DryRun) {
    & (Join-Path $scriptDir 'Deploy-ToCDN.ps1') -BuildPath $BuildPath -CdnPath $CdnPath -DryRun
} else {
    & (Join-Path $scriptDir 'Deploy-ToCDN.ps1') -BuildPath $BuildPath -CdnPath $CdnPath
}

# Ensure CDN web.config ton tai DAY DU (CORS + cache + MIME types).
# Robocopy /MIR khong dung den root web.config. Neu thieu OR thieu MIME nao
# (vd .plist), client se 404. Force overwrite de luon co full MIME list.
$cdnWebConfig = Join-Path $CdnPath 'web.config'
$needsRewrite = -not (Test-Path $cdnWebConfig)
if (-not $needsRewrite) {
    # Re-write neu thieu MIME .plist (signal config out-of-date)
    $existingContent = Get-Content $cdnWebConfig -Raw -ErrorAction SilentlyContinue
    if ($existingContent -notmatch '\.plist') { $needsRewrite = $true }
}
if (-not $DryRun -and $needsRewrite) {
    Write-Host "      web.config thieu/cu, rewrite full MIME list..." -ForegroundColor Yellow
    $cfgContent = @'
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <staticContent>
            <remove fileExtension=".json" />
            <mimeMap fileExtension=".json" mimeType="application/json" />
            <remove fileExtension=".bin" />
            <mimeMap fileExtension=".bin" mimeType="application/octet-stream" />
            <remove fileExtension=".plist" />
            <mimeMap fileExtension=".plist" mimeType="application/xml" />
            <remove fileExtension=".atlas" />
            <mimeMap fileExtension=".atlas" mimeType="text/plain" />
            <remove fileExtension=".fnt" />
            <mimeMap fileExtension=".fnt" mimeType="text/plain" />
            <remove fileExtension=".ccon" />
            <mimeMap fileExtension=".ccon" mimeType="application/octet-stream" />
            <remove fileExtension=".pkm" />
            <mimeMap fileExtension=".pkm" mimeType="application/octet-stream" />
            <remove fileExtension=".pvr" />
            <mimeMap fileExtension=".pvr" mimeType="application/octet-stream" />
            <remove fileExtension=".webp" />
            <mimeMap fileExtension=".webp" mimeType="image/webp" />
            <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
        </staticContent>
        <httpProtocol>
            <customHeaders>
                <add name="Access-Control-Allow-Origin" value="*" />
                <add name="Access-Control-Allow-Methods" value="GET, OPTIONS" />
                <add name="Access-Control-Allow-Headers" value="Content-Type, X-Requested-With" />
                <add name="Access-Control-Max-Age" value="86400" />
            </customHeaders>
        </httpProtocol>
        <directoryBrowse enabled="false" />
    </system.webServer>
</configuration>
'@
    [System.IO.File]::WriteAllText($cdnWebConfig, $cfgContent, [System.Text.UTF8Encoding]::new($false))
    Write-Host "      web.config OK" -ForegroundColor Green
}

# ─── Step 3: Copy main package -> C:\IIS\Game ───────────────────────
Write-Host ""
Write-Host "[3/3] Copy main package -> $GamePath..." -ForegroundColor Cyan

$mainFiles = @(
    'index.html',
    'splash.*',
    'favicon.*',
    'style*.css',
    '*.js'   # main.*.js + cocos2d-js-min.*.js + physics-min.*.js
)
$mainFolders = @(
    'src'    # src/settings.<hash>.js + src/assets/<bundle>/scripts/.../plugin.js
)

# Backup truoc
if (-not $SkipBackup -and -not $DryRun -and (Test-Path $GamePath)) {
    $backupDir = Join-Path $GamePath ("backup_" + (Get-Date -Format 'yyyyMMdd_HHmmss'))
    Write-Host "      Backup -> $backupDir" -ForegroundColor Yellow
    New-Item -Path $backupDir -ItemType Directory -Force | Out-Null
    foreach ($pattern in $mainFiles) {
        Get-ChildItem -Path $GamePath -Filter $pattern -File -ErrorAction SilentlyContinue |
            Where-Object { $_.DirectoryName -eq $GamePath } |
            Copy-Item -Destination $backupDir -Force
    }
    # web.config khong copy (file rieng cua IIS site)
}

# Copy file root level
foreach ($pattern in $mainFiles) {
    $srcFiles = Get-ChildItem -Path $BuildPath -Filter $pattern -File -ErrorAction SilentlyContinue
    foreach ($f in $srcFiles) {
        $destFile = Join-Path $GamePath $f.Name
        if ($DryRun) {
            Write-Host ("      [DRYRUN] copy: {0} ({1:N0} bytes)" -f $f.Name, $f.Length) -ForegroundColor Gray
        } else {
            Copy-Item -Path $f.FullName -Destination $destFile -Force
            Write-Host ("      copied: {0} ({1:N0} bytes)" -f $f.Name, $f.Length) -ForegroundColor Green
        }
    }
}

# Copy folder (vd src/ chua settings.<hash>.js + plugin script)
# Robocopy mirror: xoa file cu khong co trong build, copy file moi.
foreach ($folder in $mainFolders) {
    $srcFolder = Join-Path $BuildPath $folder
    if (-not (Test-Path $srcFolder)) { continue }
    $dstFolder = Join-Path $GamePath $folder
    if ($DryRun) {
        Write-Host ("      [DRYRUN] mirror folder: {0} -> {1}" -f $srcFolder, $dstFolder) -ForegroundColor Gray
    } else {
        $rcArgs = @("`"$srcFolder`"", "`"$dstFolder`"", '/MIR', '/COPY:DAT', '/R:2', '/W:1', '/MT:4', '/NFL', '/NDL', '/NJH', '/NJS')
        & robocopy.exe @rcArgs | Out-Null
        $count = (Get-ChildItem -Path $dstFolder -Recurse -File).Count
        Write-Host ("      mirrored folder: {0}/ ({1} files)" -f $folder, $count) -ForegroundColor Green
    }
}

# ─── Step 4: Copy core bundles ve origin ────────────────────────────
# Cocos engine HARDCODE load 3 bundle dac biet tu relative URL
# (KHONG di qua BundleControl). Phai o C:\IIS\Game\assets\:
#   - main      : start scene + project script
#   - internal  : engine internal asset (cc.builtin)
#   - resources : cho cc.resources.load() API (legacy cc.loader.loadRes)
# Cac bundle khac (lobby, common, prefabs, taixiu, ...) chi can o CDN.
Write-Host ""
Write-Host "[4/4] Copy core bundles (main, internal, resources) -> origin..." -ForegroundColor Cyan

foreach ($coreBundle in @('main', 'internal', 'resources')) {
    $srcBundle = Join-Path $BuildPath "assets\$coreBundle"
    if (-not (Test-Path $srcBundle)) {
        Write-Host ("      WARNING: KHONG tim thay {0}/" -f $srcBundle) -ForegroundColor Yellow
        continue
    }
    $dstBundle = Join-Path $GamePath "assets\$coreBundle"
    if ($DryRun) {
        Write-Host ("      [DRYRUN] mirror: {0} -> {1}" -f $srcBundle, $dstBundle) -ForegroundColor Gray
    } else {
        $rcArgs = @("`"$srcBundle`"", "`"$dstBundle`"", '/MIR', '/COPY:DAT', '/R:2', '/W:1', '/MT:4', '/NFL', '/NDL', '/NJH', '/NJS')
        & robocopy.exe @rcArgs | Out-Null
        $count = (Get-ChildItem -Path $dstBundle -Recurse -File).Count
        Write-Host ("      mirrored: assets/{0}/ ({1} files)" -f $coreBundle, $count) -ForegroundColor Green
    }
}

# Xoa file *.js cu trong C:\IIS\Game (file co hash khac, build moi co hash khac)
# Cocos build voi md5Cache=true: main.<hash>.js -> hash thay doi giua build
if (-not $DryRun) {
    $newJsHashes = (Get-ChildItem -Path $BuildPath -Filter "*.js" -File).Name
    Get-ChildItem -Path $GamePath -Filter "*.js" -File |
        Where-Object {
            $_.DirectoryName -eq $GamePath -and
            $_.Name -notin $newJsHashes -and
            -not $_.Name.StartsWith('backup_')
        } |
        ForEach-Object {
            Write-Host ("      removed stale: {0}" -f $_.Name) -ForegroundColor Yellow
            Remove-Item $_.FullName -Force
        }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  DONE" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test:" -ForegroundColor White
Write-Host "  F5 https://bay789x.me/" -ForegroundColor Gray
Write-Host "  F12 Network: kiem tra fetch tu res.bay789x.me" -ForegroundColor Gray
