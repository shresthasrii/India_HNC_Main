@echo off
title India Heritage and Culture - Multi-Part Explorer
color 0B

echo ===================================================================
echo     INDIA HERITAGE AND CULTURE - MULTI-PART CODE SYSTEM
echo ===================================================================
echo  [1] Open Part 1: Initial Foundation (HTML & CSS Layout)
echo  [2] Open Part 2: Hero Section & Live System Clock
echo  [3] Open Part 3: Interactive Vector India Map & Tourism Links
echo  [4] Open Part 4: Final Complete System (Map + Clock + Timeline)
echo  [5] Open All 4 Parts in Browser for Comparison
echo  [0] Exit
echo ===================================================================
set /p choice="Select an option (1-5): "

if "%choice%"=="1" start "" "%~dp0initial\index.html"
if "%choice%"=="2" start "" "%~dp0part 2\index.html"
if "%choice%"=="3" start "" "%~dp0part 3\index.html"
if "%choice%"=="4" start "" "%~dp0final\index.html"
if "%choice%"=="5" (
    start "" "%~dp0initial\index.html"
    start "" "%~dp0part 2\index.html"
    start "" "%~dp0part 3\index.html"
    start "" "%~dp0final\index.html"
)
