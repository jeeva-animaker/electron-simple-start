
export function sendMessage(message) {
    chrome.runtime && chrome.runtime.sendMessage(message)
    window.top.postMessage(message, '*')
}

export function getStream(constraints) {
    return navigator.mediaDevices.getUserMedia(
        constraints
    )
}