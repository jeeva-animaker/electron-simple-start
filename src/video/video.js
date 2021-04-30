import React from 'react'
import styled from 'styled-components'
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
    const { videoEle } = useVideo()

    return (
        <VideoContainer >
            <video
                ref={videoEle}
                id="sample-video-show"
                autoPlay
                style={
                    {
                        display: 'none',
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
