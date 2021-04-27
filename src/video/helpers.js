
export function sendMessage(message, payload = null) {
    chrome.runtime && chrome.runtime.sendMessage({ message, payload })
    window.top.postMessage({ message, payload }, '*')
}

export function getStream(constraints) {
    return navigator.mediaDevices.getUserMedia(
        constraints
    )
}