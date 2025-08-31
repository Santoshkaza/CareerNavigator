@echo off
echo ========================================
echo           Server Status Check
echo ========================================
echo.

echo Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✓ MongoDB is running
) else (
    echo ✗ MongoDB is not running
)

echo.
echo Checking Backend (port 5000)...
netstat -ano | findstr ":5000" >nul
if "%ERRORLEVEL%"=="0" (
    echo ✓ Backend server is running on port 5000
) else (
    echo ✗ Backend server is not running on port 5000
)

echo.
echo Checking Frontend (port 5173)...
netstat -ano | findstr ":5173" >nul
if "%ERRORLEVEL%"=="0" (
    echo ✓ Frontend server is running on port 5173
) else (
    echo ✗ Frontend server is not running on port 5173
)

echo.
pause
