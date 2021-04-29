import React, { createContext, useReducer } from 'react'
import _ from 'lodash'
import { Video } from './video'
import { createGlobalStyle } from 'styled-components'

export const MainContext = createContext()

const GlobalStyle = createGlobalStyle`
    html, body, #video-wrapper {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
`

export function Main() {
    const [state, dispatch] = useReducer(
        (state, action) => {
            const newState = _.cloneDeep(state)
            switch (action.type) {
                case 'video:stream:created':
                    newState.stream = action.payload.stream
                    break;

                default:
                    console.log(action.type)
                    break;
            }
            return newState
        },
        {
        }
    )

    return (
        <MainContext.Provider value={
            {
                state,
                dispatch
            }
        }>
            <GlobalStyle />
            <Video />
        </MainContext.Provider>
    )
}
