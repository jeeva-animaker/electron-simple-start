import React from 'react'
import { createContext, useReducer } from "react";
import { App } from "./app";
import _ from 'lodash'

export const MainContext = createContext()

export function Main() {
    const [state, dispatch] = useReducer(
        (state, action) => {
            const newState = _.cloneDeep(state)
            switch (action.type) {
                case 'app:open':
                    newState.isOpen = true
                    break;
                case 'app:close':
                    newState.isOpen = false
                    break;
                case 'video:permission:success':
                    newState.haveVideoPermission = true
                    break;
                case 'video:devices:listed':
                    newState.videoDevices = action.payload.devices;
                    newState.currentDeviceId = newState.videoDevices[0].deviceId
                    newState.isLoading = false
                    break;
                case 'video:devices:select':
                    newState.currentDeviceId = action.payload.deviceId;
                    break;
                case 'video:frame:toggle':
                    newState.showVideoFrame = action.payload.value
                    break;
                case 'video:record:toggle':
                    newState.isRecordStarted = action.payload.value
                    break;
                case 'video:player:select':
                    newState.videoPlayer = action.payload.value;
                    break;
                default:
                    console.log(action.type)
                    break;
            }
            return newState
        },
        {
            isOpen: false,
            isLoading: true,
            haveVideoPermission: false,
            showVideoFrame: false,
            isRecordStarted: false,
            currentDeviceId: '',
            videoPlayer: 'outside'
        }
    )

    return (
        <MainContext.Provider
            value={
                {
                    state,
                    dispatch
                }
            }
        >
            <App />
        </MainContext.Provider>
    )
}
