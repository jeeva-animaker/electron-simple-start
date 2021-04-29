import React, { Fragment } from 'react'
import styled from 'styled-components'
import { getUrl } from './helpers'
import { useApp } from './useApp'

const AppWrapper = styled.div`
`

const PopupWrapper = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 15px;
    border: 1px solid;
    z-index: 999999;
`

const TypeSelectGroup = styled.div`
    display: flex;
    width: 100%;
    height: auto;
`
const TypeButton = styled.button`
    display: flex;
    width: 100%;
    padding: 15px;
    background: ${props => props.selected ? 'blue' : 'white'};
    color: ${props => props.selected ? 'white' : 'black'};
    justify-content: center;
    align-items: center;
    border: 1px solid;
`

const VideoSelector = styled.select`
    margin-top: 10px;
    width: 100%;
    padding: 5px;
`

const RecordButton = styled.button`
    margin-top: 10px;
    width: 100%;
    display: block;
    padding: 10px;
    background: #cfcfcf;
`

const IframeWrapper = styled.div`
    ${props => {
        let position = 'fixed';
        let bottom = '10px';
        let left = '10px';
        if (props.inside) {
            position = 'relative'
            bottom = left = '0px'
        }

        return `
            position: ${position};
            bottom: ${bottom};
            left: ${left};
        `
    }}
    margin: 0 auto;
    width: 200px;
    height: auto;
    z-index: 999999;
`

const Iframe = styled.iframe`
    width: 200px;
    height: 200px;
    border: none;
    background: white;
    display: ${props => props.show ? 'block' : 'none'};
`

export function App() {
    const {
        isOpen,
        isLoading,
        haveVideoPermission,
        askPermission,
        videoDevices,
        videoFrame,
        currentDeviceId,
        isRecordStarted,
        showVideoFrame,
        onVideoDeviceSelect,
        startRecord,
        stopRecord,
        changeVideoPlayer,
        videoPlayer
    } = useApp()

    return isOpen && (
        <AppWrapper>
            <PopupWrapper>
                <TypeSelectGroup>
                    <TypeButton
                        selected={videoPlayer === 'outside'}
                        onClick={e => { changeVideoPlayer('outside') }}
                    >
                        Outside
                    </TypeButton>
                    <TypeButton
                        selected={videoPlayer === 'inside'}
                        onClick={e => { changeVideoPlayer('inside') }}
                    >
                        Inside
                    </TypeButton>
                </TypeSelectGroup>
                {
                    videoPlayer === 'inside' &&
                    <IframeWrapper inside>
                        <Iframe
                            allow='camera;microphone'
                            ref={videoFrame}
                            show={showVideoFrame}
                            src={getUrl('public/video/index.html')}
                        />
                    </IframeWrapper>
                }
                {
                    haveVideoPermission &&
                    <Fragment>
                        <VideoSelector
                            value={currentDeviceId}
                            onChange={onVideoDeviceSelect}
                        >
                            {
                                videoDevices && videoDevices.map(
                                    (device, i) => (
                                        <option key={i} value={device.deviceId}>{device.label}</option>
                                    )
                                )
                            }
                        </VideoSelector>
                        {
                            !isRecordStarted &&
                            <RecordButton
                                onClick={startRecord}
                            >
                                Start Recording
                                </RecordButton>
                        }
                        {
                            isRecordStarted &&
                            <RecordButton
                                onClick={stopRecord}
                            >
                                Stop Recording
                                </RecordButton>
                        }
                    </Fragment>
                }
                {
                    !haveVideoPermission &&
                    <RecordButton
                        onClick={e => askPermission()}
                    >Enable Video</RecordButton>
                }
            </PopupWrapper>
            {
                videoPlayer === 'outside' &&
                <IframeWrapper>
                    <Iframe
                        allow='camera;microphone'
                        ref={videoFrame}
                        show={showVideoFrame}
                        src={getUrl('public/video/index.html')}
                    />
                </IframeWrapper>
            }
        </AppWrapper>
    )
}