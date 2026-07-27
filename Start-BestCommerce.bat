@echo off
title BestCommerce Launcher

echo Starting BestCommerce backend and frontend...

start "BestCommerce Backend" cmd /k "cd /d D:\BestCommerce\CSE299-SECTION3-GROUP1-rahatlatest\CSE299-SECTION3-GROUP1-rahat && call .venv\Scripts\activate.bat && python manage.py runserver"

start "BestCommerce Frontend" cmd /k "cd /d D:\BestCommerce\CSE299-SECTION3-GROUP1-Shakib-FrontendLatest\CSE299-SECTION3-GROUP1-Shakib-Frontend\my-app && npm run dev"

timeout /t 5 /nobreak >nul

start http://localhost:5173/chat

echo BestCommerce has been started.
exit