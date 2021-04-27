import RecordRTC, { MediaStreamRecorder } from 'recordrtc'

let RECORDER = {
    permission: false,
    constraints: {
        video: true
    },
    instance: null,
    stream: null,
    blobs: []
}
const sendMessageById = (id, msg) => {
    chrome.tabs.sendMessage(id, msg);
}
const sendMessage = (msg) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
            sendMessageById(activeTab.id, msg);
        }
    });
}

function getStream() {
    return navigator.mediaDevices.getUserMedia(
        RECORDER.constraints
    )
}

chrome.runtime.onMessage.addListener(
    (e) => {
        switch (e.message) {
            case 'video:permission:success':
                RECORDER.permission = true
                break;
            case 'video:record:start':
                startRecord()
                break;
            case 'video:record:stop':
                stopRecord()
                break;
            default:
                console.log(e.message)
                break;
        }
    }
)

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
            sendMessage(
                {
                    message: 'video:record:started'
                }
            )
        })
}

function stopRecord() {
    RECORDER.instance.stopRecording(blob => {
        RECORDER.instance.save('video.webm')
    })
    RECORDER.stream && RECORDER.stream.stop()
    sendMessage(
        {
            message: 'video:record:stopped'
        }
    )
}

navigator.mediaDevices.enumerateDevices()
    .then(console.log(value))