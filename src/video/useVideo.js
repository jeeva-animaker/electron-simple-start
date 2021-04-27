import { useContext, useEffect, useRef } from "react";
import { MainContext } from "./main";
import { getStream, sendMessage } from "./helpers";

export function useVideo() {
    const { state, dispatch } = useContext(MainContext)

    const videoEle = useRef()

    function getPermissions() {
        getStream(state.constraints).then(
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
            console.log(error)
            sendMessage(
                {
                    message: 'video:permission:error',
                    error
                }
            )
        })
    }

    function showVideo() {
        getStream(state.constraints).then(
            stream => {
                videoEle.current.srcObject = stream
                dispatch({
                    type: 'ADD_STREAM',
                    payload: {
                        stream
                    }
                })
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
        videoEle.current.src = ''
        if (state.stream && state.stream.stop) {
            state.stream.stop()
        } else {
            state.stream.getTracks().forEach(track => track.stop())
        }
        sendMessage(
            {
                message: 'video:hide:success'
            }
        )
    }

    const windowMessageListener = (e) => {
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

    useEffect(() => {
        window.addEventListener('message', windowMessageListener)
        return () => {
            window.removeEventListener('message', windowMessageListener)
        };
    }, [state]);

    return {
        videoEle
    }

}