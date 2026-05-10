# ──────────────────────────────────────────────────────────────────
# Optimize-IISAppPools.ps1
# ──────────────────────────────────────────────────────────────────
# Apply 3 setting de tranh "cold start" cho IIS app pool:
#   1. startMode              = AlwaysRunning  (auto start theo W3SVC)
#   2. processModel.idleTimeout = 00:00:00     (khong shutdown vi idle)
#   3. site.preloadEnabled    = true          (auto warm-up sau khi pool start)
#
# Dung khi:
#   - Setup server moi.
#   - Them IIS site moi.
#   - Audit dinh ky.
#
# CACH CHAY:
#   PowerShell as Admin, run:
#     .\Optimize-IISAppPools.ps1                  # apply cho TAT CA pool
#     .\Optimize-IISAppPools.ps1 -SiteName taixiu # chi 1 site
#     .\Optimize-IISAppPools.ps1 -DryRun          # chi xem, khong sua
# ──────────────────────────────────────────────────────────────────
[CmdletBinding()]
param(
    [string]$SiteName = '',   # rong = lam tat ca site
    [switch]$DryRun           # true = chi liet ke khong sua
)

Import-Module WebAdministration -ErrorAction Stop

# Lay danh sach site can xu ly
if ($SiteName) {
    $sites = Get-Website -Name $SiteName
    if (-not $sites) {
        Write-Host "Khong tim thay site '$SiteName'" -ForegroundColor Red
        exit 1
    }
} else {
    $sites = Get-Website
}

$ok = 0
$skipped = 0
$failed = 0

Write-Host ""
Write-Host ("{0,-30} {1,-30} {2,-15} {3,-12} {4,-8}" -f "SITE", "POOL", "STARTMODE", "IDLETIME", "PRELOAD") -ForegroundColor Cyan
Write-Host ("{0,-30} {1,-30} {2,-15} {3,-12} {4,-8}" -f "----", "----", "---------", "--------", "-------") -ForegroundColor Cyan

foreach ($site in $sites) {
    if ($site.state -ne 'Started') {
        Write-Host ("{0,-30} (state={1}) - SKIP" -f $site.name, $site.state) -ForegroundColor Yellow
        $skipped++
        continue
    }

    try {
        $poolName = $site.applicationPool
        $pool = Get-Item "IIS:\AppPools\$poolName" -ErrorAction Stop

        $needFix = $false
        $changes = @()

        if ($pool.startMode -ne 'AlwaysRunning') {
            $needFix = $true
            $changes += "startMode: $($pool.startMode) -> AlwaysRunning"
        }
        if ($pool.processModel.idleTimeout -ne [TimeSpan]::Zero) {
            $needFix = $true
            $changes += "idleTimeout: $($pool.processModel.idleTimeout) -> 00:00:00"
        }

        $preload = $false
        try {
            $preload = (Get-ItemProperty "IIS:\Sites\$($site.name)" -Name applicationDefaults.preloadEnabled).Value
        } catch {}
        if (-not $preload) {
            $needFix = $true
            $changes += "preloadEnabled: false -> true"
        }

        $statusColor = if ($needFix) { 'White' } else { 'Green' }
        $marker = if ($needFix) { '*' } else { ' ' }

        Write-Host ("{0}{1,-29} {2,-30} {3,-15} {4,-12} {5,-8}" -f `
            $marker, $site.name, $poolName, $pool.startMode, `
            $pool.processModel.idleTimeout, $preload) -ForegroundColor $statusColor

        if (-not $needFix) {
            $ok++
            continue
        }

        if ($DryRun) {
            $changes | ForEach-Object { Write-Host "    [DRYRUN] $_" -ForegroundColor Gray }
            $skipped++
            continue
        }

        # Apply
        Set-ItemProperty "IIS:\AppPools\$poolName" -Name startMode -Value AlwaysRunning
        Set-ItemProperty "IIS:\AppPools\$poolName" -Name processModel.idleTimeout -Value "00:00:00"
        Set-ItemProperty "IIS:\Sites\$($site.name)" -Name applicationDefaults.preloadEnabled -Value $true

        $changes | ForEach-Object { Write-Host "    [FIXED]  $_" -ForegroundColor Green }
        $ok++
    }
    catch {
        Write-Host "FAIL $($site.name) : $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host ("Done. Ok/AlreadyOptimized: $ok | Skipped: $skipped | Failed: $failed") -ForegroundColor Cyan

if (-not $DryRun -and $ok -gt 0) {
    Write-Host ""
    Write-Host "Tip: warm-up cac pool ngay bang cach hit / cua tung site:" -ForegroundColor Yellow
    Write-Host "     foreach (`$s in (Get-Website)) { Invoke-WebRequest `"http://`$(`$s.name)/`" -TimeoutSec 30 -UseBasicParsing | Out-Null }" -ForegroundColor Gray
}
