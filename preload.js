const { ipcRenderer } = require("electron")

window.addEventListener(
    'DOMContentLoaded',
    () => {
        const timerEl = document.getElementById('timer')
        if (!timerEl) {
            return
        }
        let x = 10
        const updateTimer = () => {
            if (x < 0) {
                clearInterval(timerInterval)
                return
            }

            timerEl.innerText = x
            ipcRenderer.send('timer:update', x)
            x = x - 1
        }
        const timerInterval = setInterval(
            updateTimer,
            1000
        )
    }
)