import React, { useEffect, useMemo, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { buttonGrid, operators } from './buttons'
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
    const [active, setActive] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [history, setHistory] = useState([])
    const [func, setFunc] = useState('')
    const [ans, setAns] = useState('')

    const buttonActions = {
        number: (button) => {
            let newFunc = func
            const lastChar = newFunc.substring(newFunc.length - 1, newFunc.length)

            if (lastChar === '%') {
                newFunc += '*'
            }
            newFunc = newFunc + button.value
            setFunc(newFunc)
        },
        decimalPoint: (button) => {
            let newFunc = func
            const lastChar = newFunc.substring(newFunc.length - 1, newFunc.length)

            if (lastChar === '.') {
                return
            }
            newFunc += button.value
            setFunc(newFunc)
        },
        operator: (button) => {
            let newFunc = func
            const lastChar = newFunc.substring(newFunc.length - 1, newFunc.length)

            if (operators.includes(lastChar)) {
                newFunc = newFunc.substring(0, newFunc.length - 1)
            }
            newFunc = (newFunc || ans) + button.value
            setFunc(newFunc)
        },
        openFunc: (button) => {
            let newFunc = func
            const lastChar = newFunc.substring(newFunc.length - 1, newFunc.length)

            if (!operators.includes(lastChar)) {
                newFunc += '*'
            }
            newFunc = newFunc + button.value
            setFunc(newFunc)
        },
        closeFunc: (button) => {
            let newFunc = func + button.value

            setFunc(newFunc)
        },
        clear: () => {
            let newFunc
            if (isSubmitted) {
                newFunc = ''
            } else {
                newFunc = func.substring(0, func.length - 1)
            }
            setFunc(newFunc)
        },
        submit: () => {
            if (!func) {
                return
            }
            let newAns
            try {
                let calcFunc = func.replaceAll('%', '/100')
                newAns = eval(calcFunc)
            } catch (_) {
                newAns = 'Error'
            }
            setAns(newAns)

            setHistory(
                [
                    ...history,
                    func
                ]
            )
            setFunc('')
            setIsSubmitted(true)
        },
        default: (button) => {
            console.log('TODO: Implement Action')
        }
    }
    const onButtonClick = (button) => {
        setIsSubmitted(false)
        button.role = button.role || 'default'
        const action = buttonActions[button.role] || buttonActions['default']

        action(button)
    }

    useEffect(() => {
        let listener = (event) => {
            let button = null
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
                button = {
                    role: 'number',
                    value: event.key
                }
            } else if (event.key === 'Backspace') {
                button = {
                    role: 'clear',
                }
            } else if (event.key === 'Enter' || event.key === '=') {
                button = {
                    role: 'submit'
                }
            } else if (['+', '-', '*', '/', '%'].includes(event.key)) {
                button = {
                    role: 'operator',
                    value: event.key
                }
            } else if (event.key === '(') {
                button = {
                    role: 'openFunc',
                    value: '('
                }
            } else if (event.key === ')') {
                button = {
                    role: 'closeFunc',
                    value: ')'
                }
            } else if (event.key === '.') {
                button = {
                    role: 'decimalPoint',
                    value: '.'
                }
            }
            if (button) {
                onButtonClick(button)
            }
        }
        window.addEventListener('keydown', listener)
        return () => {
            window.removeEventListener('keydown', listener)
        };
    })

    return (
        <ThemeProvider
            theme={theme}
        >
            <GlobalStyle />
            <Wrapper>
                <Input
                    active
                    isSubmitted={isSubmitted}
                    history={history}
                    func={func}
                    ans={ans}
                />
                <ButtonsContainer>
                    {
                        buttonGrid.map(
                            (buttons, i) => (
                                <ButtonsRow key={i}>
                                    {
                                        buttons.map(
                                            (button, i) => (
                                                <Button key={i}
                                                    dangerouslySetInnerHTML={
                                                        {
                                                            __html: (
                                                                typeof button.text === 'function'
                                                                    ? button.text({ isSubmitted })
                                                                    : button.text
                                                            )
                                                        }
                                                    }
                                                    {...(button.buttonProps ? button.buttonProps : {})}
                                                    onClick={() => {
                                                        onButtonClick(button)
                                                    }}
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