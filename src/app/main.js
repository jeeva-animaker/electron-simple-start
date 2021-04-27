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
                case 'GOT_VIDEO_PERMISSION':
                    newState.haveVideoPermission = true
                    break;

                default:
                    break;
            }
            return newState
        },
        {
            haveVideoPermission: false
        }
    )

    return (
        <MainContext.Provider
            value={
                state,
                dispatch
            }
        >
            <App />
        </MainContext.Provider>
    )
}
