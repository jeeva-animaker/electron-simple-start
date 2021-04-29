import { useContext, useEffect, useRef } from "react"
import { MainContext } from "./main"
import _ from "lodash"

export function useApp() {
    const { state, dispatch } = useContext(MainContext)
    const videoFrame = useRef()

    const sendMessage = (message, payload = null, callback = null) => {
        chrome.runtime && chrome.runtime.sendMessage({ message, payload }, callback)
        videoFrame && videoFrame.current
            && videoFrame.current.contentWindow.postMessage({ message, payload }, '*')
    }

    const askPermission = () => {
        sendMessage('video:permission:request')
    }

    useEffect(
        () => {
            // videoFrame.current && videoFrame.current.addEventListener('load', () => {
            //     askPermission()
            // })

            sendMessage('video:permission:check', null, (result) => {
                if (result) {
                    onPermissionSuccess()
                }
            })
        },
        []
    )

    const onPermissionSuccess = () => {
        dispatch(
            {
                type: 'video:permission:success'
            }
        )
        getVideoDevices()
    }

    const getVideoDevices = () => {
        sendMessage(
            'video:devices:list',
            null,
            devices => {
                dispatch(
                    {
                        type: 'video:devices:listed',
                        payload: {
                            devices
                        }
                    }
                )
            }
        )
    }

    const windowMessageListener = (e) => {
        switch (e.data.message) {
            case 'video:permission:success':
                onPermissionSuccess()
                break;
            case 'video:show:success':
                dispatch(
                    {
                        type: 'video:frame:toggle',
                        payload: {
                            value: true
                        }
                    }
                )
                break;
            case 'video:hide:success':
                dispatch(
                    {
                        type: 'video:frame:toggle',
                        payload: {
                            value: false
                        }
                    }
                )
                break;
            default:
                console.log(e.data.message)
                break;
        }
    }

    const chromeRuntimeMessageHanlder = ((data, sender, response) => {
        let result = false
        switch (data.message) {
            case 'app:toggle':
                if (state.isOpen) {
                    dispatch({ type: 'app:close' })
                } else {
                    dispatch({ type: 'app:open' })
                }
                break;
            case 'video:record:started':
                dispatch(
                    {
                        type: 'video:record:toggle',
                        payload: {
                            value: true
                        }
                    }
                )
                break;
            case 'video:record:stopped':
                dispatch(
                    {
                        type: 'video:record:toggle',
                        payload: {
                            value: false
                        }
                    }
                )
                break;
            default:
                console.log(data.message)
                break;
        }
        return result
    })

    useEffect(
        () => {
            window.addEventListener('message', windowMessageListener)
            chrome.runtime && chrome.runtime.onMessage && chrome.runtime.onMessage.addListener(chromeRuntimeMessageHanlder)
            return () => {
                window.removeEventListener('message', windowMessageListener)
                chrome.runtime && chrome.runtime.onMessage && chrome.runtime.onMessage.removeListener(chromeRuntimeMessageHanlder)
            }
        },
        [state]
    )

    const onVideoDeviceSelect = (e) => {
        dispatch(
            {
                type: 'video:devices:select',
                payload: {
                    deviceId: e.target.value
                }
            }
        )
    }

    const startRecord = (e) => {
        sendMessage('video:record:start', { deviceId: state.currentDeviceId })
    }
    const stopRecord = (e) => {
        sendMessage('video:record:stop')
    }

    const changeVideoPlayer = (value) => {
        dispatch(
            {
                type: 'video:player:select',
                payload: {
                    value
                }
            }
        )
    }

    return {
        ...state,
        videoFrame,
        askPermission,
        onVideoDeviceSelect,
        startRecord,
        stopRecord,
        changeVideoPlayer
    }
}