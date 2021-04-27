import { useContext, useEffect, useRef } from "react";
import { MainContext } from "./main";
import { getStream, sendMessage } from "./helpers";

export function useVideo() {
    const constraints = {
        video: true
    }
    const { state, dispatch } = useContext(MainContext)

    const videoEle = useRef()

    function getPermissions() {
        getStream(constraints).then(
            stream => {
                stream.getTracks().forEach(track => {
                    track.stop()
                });
                sendMessage('video:permission:success')
            }
        ).catch(error => {
            console.log(error)
            sendMessage('video:permission:error', error)
        })
    }

    function showVideo() {
        getStream(constraints).then(
            stream => {
                videoEle.current.srcObject = stream
                dispatch({
                    type: 'video:stream:created',
                    payload: {
                        stream
                    }
                })
                sendMessage('video:show:success')
            }
        ).catch(error => {
            sendMessage('video:show:error', error)
        })
    }

    function stopVideo() {
        videoEle.current.src = ''
        if (state.stream && state.stream.stop) {
            state.stream.stop()
        } else {
            state.stream.getTracks().forEach(track => track.stop())
        }
        sendMessage('video:hide:success')
    }

    const windowMessageListener = (e) => {
        switch (e.data.message) {
            case 'video:permission:request':
                getPermissions()
                break;
            case 'video:record:start':
                constraints.video = {
                    exact: e.data.payload.deviceId
                }
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

    useEffect(() => {
        window.addEventListener('message', windowMessageListener)
        return () => {
            window.removeEventListener('message', windowMessageListener)
        };
    }, [state]);

    return {
        ...state,
        videoEle
    }

}