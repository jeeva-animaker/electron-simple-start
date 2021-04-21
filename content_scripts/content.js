console.log('content')

const STATE = {
    videoPermission: false
}

function sendMessage(message) {
    chrome.runtime.sendMessage(message)
    videoFrame && videoFrame.contentWindow.postMessage(message, '*')
}

const mainContainer = document.createElement('sample-main-container')
mainContainer.style = 'width: 100%; height: auto;'
document.body.appendChild(mainContainer)

const startRecordButton = document.createElement('button')
startRecordButton.innerText = 'Start Record'
startRecordButton.style = "display:none; marginBottom: 20px; padding: 15px;"
mainContainer.appendChild(startRecordButton)
startRecordButton.addEventListener('click', () => {
    if (STATE.videoPermission) {
        sendMessage(
            {
                message: 'video:record:start'
            }
        )
    }
})

const stopRecordButton = document.createElement('button')
stopRecordButton.innerText = 'Stop Record'
stopRecordButton.style = "display: none; marginBottom: 20px; padding: 15px;"
mainContainer.appendChild(stopRecordButton)
stopRecordButton.addEventListener('click', () => {
    if (STATE.videoPermission) {
        sendMessage(
            {
                message: 'video:record:stop'
            }
        )
    }
})

function toggleButtons() {
    const display = STATE.videoPermission ? 'inline-block' : 'none'
    startRecordButton.style.display = display
    stopRecordButton.style.display = display
}

window.addEventListener('load', () => {
    appendVideoIframe().then(
        () => {
            askPermission()
        }
    )
})
function askPermission() {
    sendMessage(
        {
            message: 'video:permission:request'
        }
    )
}

let videoFrame
function appendVideoIframe() {
    return new Promise(
        function (resolve, reject) {
            videoFrame = document.getElementById('sample-record-video')
            if (!videoFrame) {
                videoFrame = document.createElement('iframe')
                videoFrame.id = 'sample-record-video'
                videoFrame.allow = 'camera;microphone'
                videoFrame.src = chrome.runtime.getURL('public/video/index.html')
                videoFrame.style = 'display:none; width: 100%; height: 600px;'

                mainContainer.prepend(videoFrame)
                videoFrame.addEventListener(
                    'load',
                    () => {
                        resolve()
                    }
                )
            } else {
                resolve()
            }
        }
    )
}

window.addEventListener(
    'message',
    (e) => {
        switch (e.data.message) {
            case 'video:permission:success':
                STATE.videoPermission = true
                toggleButtons()
                break;
            case 'video:show:success':
                videoFrame.style.display = 'block'
                break;
            case 'video:hide:success':
                videoFrame.style.display = 'none'
                break;
            default:
                break;
        }
    }
)
