const { BrowserWindow, app } = require("electron");
const { Menu, ipcMain } = require("electron/main");
const path = require('path')

let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            title: 'Todo List',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        }
    )

    mainWindow.loadFile('index.html')

    mainWindow.on('closed', () => {
        app.quit()
    })
}

let addWindow
function createAddWindow() {
    addWindow = new BrowserWindow(
        {
            width: 300,
            height: 250,
            title: 'Add New Todo',
            webPreferences: {
                preload: path.join(__dirname, 'addTodo.js')
            }
        }
    )

    addWindow.loadFile('addTodo.html')
    addWindow.on('closed', () => { addWindow = null })
}

function clearTodoList() {
    mainWindow.webContents.send('todo:clear')
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
                click: () => {
                    createAddWindow()
                }
            },
            {
                label: 'Clear Todo List',
                accelerator: process.platform === 'darwin' ? 'Command+W' : 'Ctrl+W',
                click: () => {
                    clearTodoList()
                }
            },
            {
                role: 'quit'
            }
        ]
    }
]

if (process.platform === 'darwin') {
    menuTemplate.unshift({ label: '' })
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push(
        {
            role: 'viewmenu'
        }
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

            const menu = Menu.buildFromTemplate(menuTemplate)
            Menu.setApplicationMenu(menu)
        }
    )
app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        app.quit()
    }
})

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo)
    addWindow.close()
})