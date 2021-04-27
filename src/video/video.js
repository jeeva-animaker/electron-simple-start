import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { MainContext } from './main'
import { useVideo } from './useVideo'

const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export function Video() {
    const { state, dispatch } = useContext(MainContext)
    const { videoEle } = useVideo(state, dispatch)

    return (
        <VideoContainer >
            <video
                ref={videoEle}
                id="sample-video-show"
                autoPlay
                style={
                    {
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                    }
                }
            >
            </video>
        </VideoContainer>
    )
}
