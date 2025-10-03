const path = require('path');
const url = require('url');
const { execFile, exec } = require('child_process');
const electron = require('electron');
const contextMenu = require('electron-context-menu');
const http = require('http');

const serverExeName = 'picgal-server';

const serverHost = 'localhost';
const serverPort = 3001;
const serverApi = '/api/v1';

const backend = execFile(`${__dirname}/../${serverExeName}`, {cwd: `${__dirname}/..`}, (error) => {
    if (error) {
        throw error;
    }
});

const dialog = electron.dialog;

dialog.showErrorBox = (title, content) => {
    console.log(`${title}\n${content}`);
};

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

contextMenu({
    shouldShowMenu: (event, parameters) => parameters.mediaType === 'image' && parameters.titleText === ' ',
    menu: (menuElements, params, browserWindow, dictionarySuggestions) => [
        {
            label: 'Save Image As...',
            visible: true,
            click: async () => {
                const imageId = params.srcURL.split('/').pop();
                imageId;

                const { filePath } = await dialog.showSaveDialog({
                    title: 'Save Image',
                    defaultPath: `${app.getPath('downloads')}/${imageId}`
                });

                if (!filePath) {
                    return;
                }

                const body = JSON.stringify({ filename: filePath });

                const req = http.request({
                    hostname: serverHost,
                    port: serverPort,
                    path: `${serverApi}/image/${imageId}/save`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(body)
                    }
                },
                _ => {});

                req.write(body);
                req.end();
            }
        },
        menuElements.copyImage()
    ]
});

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 1100, minWidth: 1100, height: 900, minHeight: 900 });

    const startUrl = url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);

    mainWindow.removeMenu();

    mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (process.platform === 'win32') {
            exec(`taskkill /im ${serverExeName}.exe /f /t`);
        }
        else {
            backend.kill();
        }

        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
