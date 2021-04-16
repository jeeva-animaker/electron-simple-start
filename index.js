const { BrowserWindow, app } = require("electron");
const path = require('path');
const { CustomTray } = require("./customTray");

let mainWindow
let tray

app.dock.hide()
function createWindow() {
    mainWindow = new BrowserWindow(
        {
            width: 300,
            height: 450,
            frame: false,
            resizable: false,
            show: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        }
    )

    mainWindow.loadFile('index.html')
    mainWindow.on('blur', () => mainWindow.hide())

    const icon = process.platform === 'win32' ? 'icon-win.png' : 'icon.png'

    tray = new CustomTray(
        path.join(__dirname, 'assets', icon),
        mainWindow
    )
}

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