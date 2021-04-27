import React from 'react'
import ReactDOM from 'react-dom'
import { Main } from './main'

let container = document.querySelector('sample-video-recorder')
if (!container) {
    container = document.createElement('sample-video-recorder')
    document.body.appendChild(container)
}

ReactDOM.render(
    <Main />,
    container
)