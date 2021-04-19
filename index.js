const { BrowserWindow, app } = require("electron");
const path = require('path')

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                backgroundThrottling: false
            }
        }
    )

    mainWindow.loadFile('src/index.html')
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