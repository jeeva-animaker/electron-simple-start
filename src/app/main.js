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
                case 'video:record:toggle':
                    newState.isRecordStarted = action.payload.value
                default:
                    break;
            }
            return newState
        },
        {
            isLoading: true,
            haveVideoPermission: false,
            showVideoFrame: false,
            isRecordStarted: false,
            currentDeviceId: ''
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
