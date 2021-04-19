const { BrowserWindow, app } = require("electron");
const { ipcMain } = require("electron");
const path = require('path');
const { CustomTray } = require("./customTray");
const { MainWindow } = require("./mainWindow");

let mainWindow
let tray

app.dock.hide()
function createWindow() {
    mainWindow = new MainWindow()

    const icon = process.platform === 'win32' ? 'icon-win.png' : 'icon.png'
    tray = new CustomTray(
        path.join(__dirname, 'assets', icon),
        mainWindow
    )
}

ipcMain.on('timer:update', (e, time) => {
    if (time >= 0) {
        tray.setTitle(`${time}`)
    }
})

app.whenReady()
    .then(
        () => {
            createWindow()

            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    createWindow()
                }
            })
        }
    )
app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        app.quit()
    }
})