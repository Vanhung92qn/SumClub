# Tools — Client deploy scripts

3 PowerShell script ho tro build + deploy lên CDN + optimize IIS.

## Files

| File | Vai tro | Chay o dau |
|---|---|---|
| `Generate-AssetBundleVersion.ps1` | Quet `build/web-mobile/assets/*` -> tao `AssetBundleVersion.json` | Local (sau khi build) |
| `Deploy-ToCDN.ps1` | Robocopy `build/web-mobile/assets/*` + JSON -> CDN folder | Local (neu mount) hoac Server |
| **`Apply-Build.ps1`** | **All-in-one: Generate + Deploy CDN + Copy main package** | **Server** (khuyen dung) |
| `Optimize-IISAppPools.ps1` | Set IIS app pool AlwaysRunning + idle 0 + preload | Server |

## Quy trinh deploy DAY DU

### 1. Local — Build trong Cocos Creator

```
Cocos Creator → Build → Web Mobile → Build
→ output: C:\SumClub\build\web-mobile\
```

### 2. Local — Tao AssetBundleVersion.json

```powershell
cd C:\SumClub\tools
.\Generate-AssetBundleVersion.ps1
```

Auto-detect build path. Output: `C:\SumClub\build\web-mobile\AssetBundleVersion.json`.

### 3. Upload build len Server

Co 3 cach:

**A. Manual qua RDP:**
   - Drag-drop folder `C:\SumClub\build\web-mobile\` -> server qua RDP clipboard.

**B. Network share:**
   - Mount `\\server\IIS$` thanh drive Z: tren local.
   - Copy: `xcopy C:\SumClub\build\web-mobile\* Z:\CDN\res\ /E /Y`.

**C. Git LFS / Git push asset:**
   - (Phuc tap, can setup LFS hoac git track binary).

### 4. Server — Deploy assets len CDN folder

Tren server (Windows Server 2019, RDP login):

```powershell
cd C:\Server\Support       # hoac C:\Server\Client\tools (sau khi pull git)
.\Deploy-ToCDN.ps1 -BuildPath "C:\path\to\build\web-mobile"
```

Robocopy: `build\web-mobile\assets\*` -> `C:\IIS\CDN\res\assets\`
+ copy `AssetBundleVersion.json` -> `C:\IIS\CDN\res\AssetBundleVersion.json`.

### 5. Server — Deploy main package

```
Copy: C:\path\to\build\web-mobile\{index.html, *.js, splash.*, style*.css}
   -> C:\IIS\Game\
```

Main package (~1.5MB) chua engine + script + scene loadingWeb.
KHONG di kem CDN — luon cung domain `bay789x.me`.

### 6. Test

```
F5 https://bay789x.me/
F12 Network tab:
   - Expect: fetch https://res.bay789x.me/AssetBundleVersion.json
   - Expect: fetch https://res.bay789x.me/assets/lobby/config.<hash>.json
   - Expect: fetch https://res.bay789x.me/assets/<game>/... khi click game
```

## Tat CDN tam thoi (debug)

Sua `assets/config/network/NetConfig.js`:
```js
ASSET_CDN_URL: '',   // ← rong = local mode (relative URL nhu cu)
```
Build + deploy main package -> client tu fallback local.

## Optimize IIS sau khi them site moi

```powershell
.\Optimize-IISAppPools.ps1                  # Tat ca site
.\Optimize-IISAppPools.ps1 -DryRun          # Chi xem
.\Optimize-IISAppPools.ps1 -SiteName res    # Chi 1 site
```

Set startMode=AlwaysRunning + idleTimeout=0 + preloadEnabled=true.
