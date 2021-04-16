const { Tray } = require("electron");

class CustomTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath)
        this.mainWindow = mainWindow

        this.on('click', (event, bounds) => {
            if (this.mainWindow.isVisible()) {
                this.mainWindow.hide()
            } else {
                const { x, y } = bounds
                const { width, height } = this.mainWindow.getBounds()

                const yOffset = process.platform === 'darwin' ? y : y - height
                this.mainWindow.setBounds(
                    {
                        width,
                        height,
                        x: x - width / 2,
                        y: yOffset
                    }
                )
                this.mainWindow.show()
            }
        })
    }

}

module.exports.CustomTray = CustomTray