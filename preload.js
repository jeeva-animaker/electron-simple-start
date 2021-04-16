const { ipcRenderer } = require("electron/renderer")

window.addEventListener(
    'DOMContentLoaded',
    () => {
        const form = document.querySelector('form')
        const input = document.querySelector('input')
        const result = document.querySelector('#result')

        form && result && form.addEventListener(
            'submit',
            e => {
                e.preventDefault()
                const file = input && input.files.length > 0 && input.files[0]
                if (file) {
                    ipcRenderer.send('video:submit', file.path)
                } else {
                    result.innerHTML = 'Please choose a video'
                }
            }
        )

        result && ipcRenderer.on(
            'video:duration',
            (e, duration) => {
                result.innerHTML = `Video duration is: ${duration} seconds`
            }
        )
        result && ipcRenderer.on(
            'video:error',
            (e, message) => {
                result.innerHTML = `Video error: ${message}`
            }
        )
    }
)