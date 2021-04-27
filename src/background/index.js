import RecordRTC, { MediaStreamRecorder } from 'recordrtc'

let RECORDER = {
    permission: false,
    constraints: {
        video: true
    },
    devices: [],
    instance: null,
    stream: null,
    blobs: []
}
const sendMessageById = (id, message, payload = null) => {
    chrome.tabs.sendMessage(id, { message, payload });
}
const sendMessage = (message, payload = null) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
            sendMessageById(activeTab.id, message, payload);
        }
    });
}

function getStream() {
    return navigator.mediaDevices.getUserMedia(
        RECORDER.constraints
    )
}

chrome.runtime.onMessage.addListener(
    (e, sender, response) => {
        let result = false
        switch (e.message) {
            case 'video:permission:success':
                RECORDER.permission = true
                break;
            case 'video:devices:list':
                getVideoDevicesList()
                    .then(devices => response(devices))
                result = true
                break;
            case 'video:record:start':
                RECORDER.constraints.video = {
                    deviceId: {
                        exact: e.payload.deviceId
                    }
                }
                startRecord()
                break;
            case 'video:record:stop':
                stopRecord()
                break;
            default:
                console.log(e.message)
                break;
        }
        return result
    }
)

function getVideoDevicesList(type) {
    return navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            let videoDevices = []
            devices.forEach(device => {
                if (device.kind === 'videoinput') {
                    videoDevices.push(device)
                }
            })
            return videoDevices
        })
}

function startRecord() {
    getStream()
        .then(stream => {
            RECORDER.stream = stream
            RECORDER.instance = RecordRTC(
                stream,
                {
                    type: 'video',
                    mimeType: 'video/webm',
                    recorderType: MediaStreamRecorder
                }
            )
            RECORDER.instance.startRecording()
            sendMessage('video:record:started')
        })
}

function stopRecord() {
    RECORDER.instance.stopRecording(blob => {
        RECORDER.instance.save('video.webm')
    })
    RECORDER.stream && RECORDER.stream.stop()
    sendMessage('video:record:stopped')
}
