import React, { useMemo, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { buttons } from './buttons'
import { Button } from './components/button'
import { GlobalStyle } from './components/globalStyles'
import { Input } from './components/input'
import { theme } from './components/theme'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    width: 650px;
`

export const ButtonsContainer = styled.div`
    display: grid;
    margin-top: 5px;
    grid-auto-rows: 35px; 
    grid-row-gap: 5px;
    width: 100%;
`

export const ButtonsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
    grid-column-gap: 5px;
    width: 100%;
`

export function App() {
    const buttonRows = useMemo(() => buttons, null)

    const [active, setActive] = useState(true)
    const [func, setFunc] = useState('')
    const [ans, setAns] = useState('')

    return (
        <ThemeProvider
            theme={theme}
        >
            <GlobalStyle />
            <Wrapper>
                <Input active />
                <ButtonsContainer>
                    {
                        buttonRows.map(
                            (buttons, i) => (
                                <ButtonsRow key={i}>
                                    {
                                        buttons.map(
                                            (button, i) => (
                                                <Button key={i}
                                                    dangerouslySetInnerHTML={
                                                        {
                                                            __html: button.text
                                                        }
                                                    }
                                                    {...(button.buttonProps ? button.buttonProps : {})}
                                                >
                                                </Button>
                                            )
                                        )
                                    }
                                </ButtonsRow>
                            )
                        )
                    }
                </ButtonsContainer>
            </Wrapper>
        </ThemeProvider >
    )
}