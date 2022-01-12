const electron = require('electron');
const path = require('path');
const url = require('url');
const { execFile, exec } = require('child_process');

const serverExeName = 'picgal-server';

const backend = execFile(`${__dirname}/../server/dist/${serverExeName}`, {cwd: `${__dirname}/../server/dist`}, (error) => {
    if (error) {
        throw error;
    }
});

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 1250, height: 900 });

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
