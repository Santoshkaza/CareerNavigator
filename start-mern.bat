@echo off
echo ========================================
echo        MERN Stack Development
echo ========================================
echo.

echo Step 1: Check if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✓ MongoDB is running
) else (
    echo ⚠ MongoDB is not running. Please start MongoDB first.
    echo   You can start it with: mongod
    echo.
)

echo Step 2: Starting backend server...
start "MERN Backend" cmd /k "cd server && npm run dev"

echo Step 3: Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Step 4: Starting frontend server...
start "MERN Frontend" cmd /k "npm run dev"

echo.
echo ✓ Both servers should be starting now!
echo   - Backend: http://localhost:5000
echo   - Frontend: http://localhost:5173
echo.
pause
