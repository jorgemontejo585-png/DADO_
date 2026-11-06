@echo off
cd /d "%~dp0"
echo Iniciando tienda DADO...
start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"
call npm run dev
pause
