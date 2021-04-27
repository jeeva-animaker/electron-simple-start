import React from 'react'
import ReactDOM from 'react-dom'
import { Main } from './main'

const videoWrapper = document.getElementById('video-wrapper')
videoWrapper &&
    ReactDOM.render(<Main />, videoWrapper)
