const { ipcRenderer } = require("electron/renderer")

window.addEventListener(
    'DOMContentLoaded',
    () => {
        const todoList = document.querySelector('ul')
        todoList && ipcRenderer.on('todo:add', (event, todo) => {
            const item = document.createElement('li')
            item.innerText = todo

            todoList.appendChild(item)
        }).on('todo:clear', (event) => {
            todoList.innerHTML = ''
        })
    }
)