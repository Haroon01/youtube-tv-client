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
        // PS5 user agent for the TV interface. 
        userAgent: 'Mozilla/5.0 (PlayStation; PlayStation 5/6.02) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15'
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
