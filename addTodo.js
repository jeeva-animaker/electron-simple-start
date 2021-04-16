const { ipcRenderer } = require('electron')
window.addEventListener(
    'DOMContentLoaded',
    () => {
        const form = document.querySelector('form')
        const input = document.querySelector('input')

        form && input && form.addEventListener('submit', (event) => {
            event.preventDefault()

            const todo = input.value
            ipcRenderer.send('todo:add', todo)
        })
    }
)