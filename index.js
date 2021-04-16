const { BrowserWindow, app } = require("electron");
const { ipcMain } = require("electron/main");
const Ffmpeg = require("fluent-ffmpeg");
const path = require('path')

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        }
    )

    mainWindow.loadFile('index.html')
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

ipcMain.on(
    'video:submit',
    (event, videoPath) => {
        Ffmpeg.ffprobe(
            videoPath,
            (err, metadata) => {
                if (!err) {
                    mainWindow.webContents.send(
                        'video:duration',
                        metadata.format.duration
                    )
                } else {
                    mainWindow.webContents.send(
                        'video:error',
                        err.message
                    )
                }
            }
        )
    }
)