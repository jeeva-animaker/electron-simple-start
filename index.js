const { BrowserWindow, app, ipcMain, shell } = require("electron");
const Ffmpeg = require("fluent-ffmpeg");
const path = require('path')

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                backgroundThrottling: false,
                nodeIntegration: true,
                contextIsolation: false
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

ipcMain.on('videos:added', (event, videos) => {
    const promises = videos.map(
        video => {
            return new Promise(
                (resolve, reject) => {
                    Ffmpeg.ffprobe(video.path, (err, metadata) => {
                        resolve(
                            {
                                ...video,
                                duration: metadata.format.duration,
                                format: 'avi'
                            }
                        )
                    })
                }
            )
        }
    )

    return Promise.all(promises)
        .then(results => {
            mainWindow.webContents.send('videos:metadata', results)
        })
})

ipcMain.on('conversion:start', (event, videos) => {
    videos.forEach(video => {
        const outputDir = video.path.split(video.name)[0]
        const outputName = video.name.split('.')[0]
        const outputPath = `${outputDir}/${outputName}.${video.format}`

        Ffmpeg(video.path)
            .output(outputPath)
            .on('progress', ({ timemark }) => {
                mainWindow.webContents.send(
                    'conversion:progress',
                    {
                        video,
                        timemark
                    }
                )
            })
            .on('end', () => {
                mainWindow.webContents.send(
                    'conversion:end',
                    {
                        video,
                        outputPath
                    }
                )
            })
            .run()
    })
})

ipcMain.on('folder:open', (event, outputPath) => {
    shell.showItemInFolder(outputPath)
})