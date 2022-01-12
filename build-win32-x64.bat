@echo off

call rmdir /s /q out\picgal-win32-x64

call rmdir /s /q build
call npm run build

call cd server

call pyinstaller --onefile --name picgal-server src/app.py
call rmdir /s /q build
call del picgal-server.spec 

call pyinstaller --onefile --name picgal-populate-database src/populate_database.py
call rmdir /s /q build
call del picgal-populate-database.spec

call cd ..

call npx electron-packager . picgal --out=out/ --platform=win32 --arch=x64 --ignore="(server/src*|server/requirements.txt|node_modules|.gitignore|.vscode|build-linux-x64|build-win32-x64.bat|public*|previews*|database.sqlite)"
