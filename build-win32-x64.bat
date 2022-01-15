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

call pyinstaller --onefile --name picgal-rebuild-previews src/rebuild_previews.py
call rmdir /s /q build
call del picgal-rebuild-previews.spec

call cd ..

call npx electron-packager . picgal --out=out/ --win32metadata.ProductName="Picgal" --win32metadata.CompanyName="konrad2508" --platform=win32 --arch=x64 --ignore="(^/server/src*|^/server/requirements.txt|^/node_modules/@.*|^/node_modules/.cache|^/node_modules/.package-lock.json|^/.gitignore|^/.vscode|^/build-linux-x64|^/build-win32-x64.bat|^/public*|^/previews*|^/database.sqlite|^/src/components*|^/src/enums*|^/src/forms*|^/src/hooks*|^/src/services*|^/src/styles*|^/src/App.jsx|^/src/index.jsx)"
