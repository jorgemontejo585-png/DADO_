@echo off
cd /d "%~dp0"
echo ==============================================
echo     INICIANDO TIENDA DADO STREETWEAR
echo ==============================================
echo.
call npx vite --open --port 3000
pause
