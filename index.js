const { BrowserWindow, app } = require("electron");
const { Tray } = require("electron/main");
const path = require('path')

let mainWindow
let tray
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

    const icon = process.platform === 'win32' ? 'icon-win.png' : 'icon.png'

    tray = new Tray(
        path.join(__dirname, 'assets', icon)
    )

    tray.on('click', (event, bounds) => {
        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            const { x, y } = bounds
            const { width, height } = mainWindow.getBounds()

            const yOffset = process.platform === 'darwin' ? y : y - height
            mainWindow.setBounds(
                {
                    width,
                    height,
                    x: x - width / 2,
                    y: yOffset
                }
            )
            mainWindow.show()
        }
    })
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