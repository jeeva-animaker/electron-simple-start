import React, { createContext, useReducer } from 'react'
import _ from 'lodash'
import { Video } from './video'

export const MainContext = createContext()

export function Main() {
    const [state, dispatch] = useReducer(
        (state, action) => {
            const newState = _.cloneDeep(state)
            switch (action.type) {
                case 'ADD_STREAM':
                    newState.stream = action.payload.stream
                    break;

                default:
                    break;
            }
            return newState
        },
        {
            constraints: {
                video: true
            }
        }
    )

    return (
        <MainContext.Provider value={
            {
                state,
                dispatch
            }
        }>
            <Video />
        </MainContext.Provider>
    )
}
