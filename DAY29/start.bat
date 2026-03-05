@echo off
echo Starting DAY29 Blog Application...
echo Note: Running with relaxed TLS for Node.js v23 compatibility
echo.
cd /d %~dp0
set NODE_TLS_REJECT_UNAUTHORIZED=0
node server.js
pause
