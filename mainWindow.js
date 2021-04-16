const { BrowserWindow } = require("electron/main");
const path = require('path');

class MainWindow extends BrowserWindow {
    constructor() {
        super(
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

        this.loadFile('index.html')

        this.on('blur', this.onBlur.bind(this))
    }

    onBlur() {
        this.hide()
    }
}

module.exports.MainWindow = MainWindow