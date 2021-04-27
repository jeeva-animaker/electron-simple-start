export function sendMessage(message) {
    chrome.runtime && chrome.runtime.sendMessage(message)
    videoFrame && videoFrame.contentWindow.postMessage(message, '*')
}

export function getUrl(path) {
    return chrome.runtime && chrome.runtime.getURL(path) || path
}
