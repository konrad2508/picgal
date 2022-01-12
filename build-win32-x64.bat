#!/usr/bin/env bash
rmdir /s out/picgal-win32-x64

npm install

rmdir /s build
npm run build

cd server

pyinstaller --onefile --name picgal-server src/app.py
rmdir /s build
del picgal-server.spec 

pyinstaller --onefile --name picgal-populate-database src/populate_database.py
rmdir /s build
del picgal-populate-database.spec

cd ..

npx electron-packager . picgal --out=out/ --platform=win32 --arch=x64 --ignore="(server/src*|server/requirements.txt|node_modules|.gitignore|.vscode|build-linux-x64|build-win32-x64.bat|public*|previews*|database.sqlite)"
