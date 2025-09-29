const path = require('path');
const url = require('url');
const { execFile, exec } = require('child_process');
const electron = require('electron');
const contextMenu = require('electron-context-menu');

const serverExeName = 'picgal-server';

contextMenu({
    showInspectElement: false,
    showSelectAll: false,
    shouldShowMenu: (event, parameters) => parameters.mediaType === 'image' && parameters.titleText === ' ',
    showSaveImageAs: true,
    showSaveVideoAs: true
});

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
