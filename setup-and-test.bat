@echo off
echo ========================================
echo      MERN Stack Quick Setup & Test
echo ========================================
echo.

echo Step 1: Installing backend dependencies...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Backend npm install failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

echo.
echo Step 2: Testing backend startup...
echo Starting backend server for 10 seconds...
start /MIN cmd /c "npm run dev"
timeout /t 10 /nobreak >nul

echo.
echo Step 3: Checking backend status...
netstat -ano | findstr ":5000" >nul
if errorlevel 1 (
    echo ❌ Backend not running on port 5000
    echo Try manually: cd server && npm run dev
) else (
    echo ✅ Backend is running on port 5000
)

echo.
echo Step 4: Installing frontend dependencies...
cd ..
call npm install
if errorlevel 1 (
    echo ❌ Frontend npm install failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

echo.
echo Step 5: Starting frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo            Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Check http://localhost:5173 for frontend
echo 2. Test backend at http://localhost:5000
echo 3. Try registering a new user
echo.
pause
