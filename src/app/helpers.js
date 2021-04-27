export function getUrl(path) {
    return chrome.runtime && chrome.runtime.getURL(path) || path
}
