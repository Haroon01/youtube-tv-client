const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    // pressing alt can bring up the menu bar even when its hidden. This accounts for that and disables it entirely
    win.setMenu(null);

    win.loadURL('https://youtube.com/tv', {
        userAgent: 'Mozilla/5.0 (PS4; Leanback Shell) Gecko/20100101 Firefox/65.0 LeanbackShell/01.00.01.75 Sony PS4/ (PS4, , no, CH)'
    });

    // setting zoom 50% to enable higher resolutions. has no effect on the applications UI.
    win.webContents.on('did-finish-load', () => {
        win.webContents.setZoomFactor(0.5);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
