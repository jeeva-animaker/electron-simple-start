import RecordRTC, { MediaStreamRecorder } from 'recordrtc'
import { db } from './db';

let RECORDER = {
    permission: false,
    constraints: {
        video: true
    },
    devices: [],
    instance: null,
    stream: null,
    isRecording: false,
    blobs: []
}

db.init()

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

function checkPermission() {
    return navigator.permissions.query({ name: 'camera' })
        .then(result => {
            if (result.state === 'granted') {
                RECORDER.permission = true
                return true
            }
            return false
        })
}

chrome.runtime.onMessage.addListener(
    (e, sender, response) => {
        let result = false
        switch (e.message) {
            case 'video:permission:check':
                checkPermission()
                    .then(result => response(result))
                result = true
                break;
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
            case 'video:record:download':
                downloadRecord().then(blobURL => response(blobURL))
                result = true
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
            RECORDER.instance = new MediaStreamRecorder(stream, {
                mimeType: 'video/webm',
                timeSlice: 1000,
                ondataavailable: function (blob) {
                    db.createBlob(blob)
                }
            })
            RECORDER.instance.record()
            RECORDER.isRecording = true
            sendMessage('video:record:started')
        })
}

function stopRecord() {
    RECORDER.instance.stop(() => {
        RECORDER.stream && RECORDER.stream.stop()
        RECORDER.isRecording = false
        RECORDER.currentRecord = null
        sendMessage('video:record:stopped')
    })
}

function downloadRecord() {
    return db.getBlobs()
        .then(blobs => {
            let finalBlob = blobs.map(b => b.blob)
            finalBlob = new Blob(finalBlob, { type: 'video/webm' })
            const blobURL = URL.createObjectURL(finalBlob)
            chrome.downloads.download({
                url: blobURL,
                filename: 'video.webm'
            })
            return blobURL
        })
}

function onBrowserActionClicked() {
    if (RECORDER.isRecording) {
        stopRecord()
    }
    sendMessage('app:toggle')
}

chrome.browserAction.onClicked.addListener(onBrowserActionClicked)