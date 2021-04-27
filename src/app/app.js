import React from 'react'
import styled from 'styled-components'

const AppWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    z-index: 9;
    background-color: white;
    padding: 15px;
    border: 1px solid;
`

const TypeSelectGroup = styled.div`
    display: flex;
    width: 100%;
    height: auto;
`
const TypeButton = styled.a`
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
`

export function App() {
    return (
        <AppWrapper>
            <TypeSelectGroup>
                <TypeButton selected>
                    Outside
                </TypeButton>
                <TypeButton>
                    Inline
                </TypeButton>
            </TypeSelectGroup>
            <VideoSelector>
                <option>device 1</option>
                <option>device 2</option>
            </VideoSelector>
            <RecordButton>
                Start Recording
            </RecordButton>
        </AppWrapper>
    )
}