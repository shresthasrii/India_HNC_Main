# ===================================================================
#     INDIA HERITAGE AND CULTURE - ALL-IN-ONE RUNNER (PowerShell)
# ===================================================================

Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "     INDIA HERITAGE AND CULTURE - ALL-IN-ONE RUNNER" -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host " Frontend : React 18 + Vite (SPA)" -ForegroundColor Gray
Write-Host " Backend  : Express 5 API (/api/*)" -ForegroundColor Gray
Write-Host " URL      : http://localhost:8080" -ForegroundColor Gray
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $scriptDir) { $scriptDir = (Get-Location).Path }
Set-Location $scriptDir

# 1. Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js was not found in your system PATH!" -ForegroundColor Red
    Write-Host "Please install Node.js (v18+) from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# 2. Check Package Manager
$pkgMgr = "npm"
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $pkgMgr = "pnpm"
}
Write-Host "[OK] Using package manager: $pkgMgr" -ForegroundColor Green

# 3. Check node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] node_modules folder missing. Installing dependencies..." -ForegroundColor Yellow
    & $pkgMgr install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Dependency installation failed!" -ForegroundColor Red
        exit 1
    }
}

# 4. Free port 8080 if needed
$occupied = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
if ($occupied) {
    foreach ($conn in $occupied) {
        Write-Host "[INFO] Freeing port 8080 from existing process (PID: $($conn.OwningProcess))..." -ForegroundColor Yellow
        Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}

# 5. Schedule browser to open
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:8080"
} | Out-Null

Write-Host ""
Write-Host "===================================================================" -ForegroundColor Green
Write-Host "Server starting now... Press Ctrl+C anytime to stop." -ForegroundColor Green
Write-Host "===================================================================" -ForegroundColor Green
Write-Host ""

# 6. Run dev server
& $pkgMgr run dev
