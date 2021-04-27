
console.log('public/index.js')

const STATE = {
    constraints: {
        video: true
    },
    stream: null
}

const video = document.getElementById('sample-video-show')

function sendMessage(message) {
    chrome.runtime.sendMessage(message)
    window.top.postMessage(message, '*')
}

function getStream() {
    return navigator.mediaDevices.getUserMedia(
        STATE.constraints
    )
}

window.addEventListener(
    'message',
    (e) => {
        switch (e.data.message) {
            case 'video:permission:request':
                getPermissions()
                break;
            case 'video:record:start':
                showVideo()
                break;
            case 'video:record:stop':
                stopVideo()
                break;
            default:
                console.log(e.data.message)
                break;
        }
    }
)

function getPermissions() {
    getStream().then(
        stream => {
            stream.getTracks().forEach(track => {
                track.stop()
            });
            sendMessage(
                {
                    message: 'video:permission:success'
                }
            )
        }
    ).catch(error => {
        sendMessage(
            {
                message: 'video:permission:error',
                error
            }
        )
    })
}

function showVideo() {
    getStream().then(
        stream => {
            video.srcObject = stream
            STATE.stream = stream
            sendMessage(
                {
                    message: 'video:show:success'
                }
            )
        }
    ).catch(error => {
        sendMessage(
            {
                message: 'video:show:error',
                error
            }
        )
    })
}

function stopVideo() {
    video.src = ''
    STATE.stream && STATE.stream.stop()
    sendMessage(
        {
            message: 'video:hide:success'
        }
    )
}