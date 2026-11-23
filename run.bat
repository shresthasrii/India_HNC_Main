@echo off
title India Heritage and Culture - Full-Stack Server
color 0B

echo ===================================================================
echo     INDIA HERITAGE AND CULTURE - ALL-IN-ONE RUNNER
echo ===================================================================
echo  Frontend : React 18 + Vite (SPA)
echo  Backend  : Express 5 API (/api/*)
echo  URL      : http://localhost:8080
echo ===================================================================
echo.

cd /d "%~dp0"

:: 1. Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not found in your system PATH!
    echo Please install Node.js v18+ from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: 2. Detect package manager (prefer pnpm, fallback to npm)
set PKG_MGR=npm
where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    set PKG_MGR=pnpm
)
echo [OK] Using package manager: %PKG_MGR%

:: 3. Check for node_modules
if not exist "node_modules" (
    echo [INFO] node_modules folder missing. Installing dependencies...
    call %PKG_MGR% install
    if %errorlevel% neq 0 (
        echo [ERROR] Dependency installation failed!
        pause
        exit /b 1
    )
)

:: 4. Free port 8080 if an old listening process is lingering
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080" ^| findstr "LISTENING"') do (
    if not "%%a"=="" (
        echo [INFO] Freeing port 8080 from previous process PID %%a...
        taskkill /F /PID %%a >nul 2>nul
    )
)

:: 5. Open default browser after a 3-second delay
echo [INFO] Launching server and scheduling browser to open http://localhost:8080 ...
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:8080"

:: 6. Run the combined Vite + Express dev server in this window
echo.
echo ===================================================================
echo Server starting now... Press Ctrl+C anytime to stop.
echo ===================================================================
echo.
call %PKG_MGR% run dev

pause
