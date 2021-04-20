import React from 'react';
import styled from "styled-components";

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.active
        ? props.theme.colors.primary.dark
        : props.theme.colors.grey.lightest};
    border-radius: 8px;
    padding: 10px 14px 0 10px;
`

export const InputElement = styled.div`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: ${props => props.theme.fontSizes.xlg};
        color: ${props => props.theme.colors.grey.darkest};
`

export const ResultContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.grey.light};
`


export function Input({ active, history, func, ans, isSubmitted }) {
    const lastFunc = history.pop()

    let showFunc = func || '0'
    if (isSubmitted) {
        showFunc = ans
    }

    let showAns = ans !== '' ? 'Ans = ' + ans : ''
    if (isSubmitted) {
        showAns = lastFunc + ' = '
    }


    return (
        <InputWrapper active>
            <ResultContainer>
                <span
                    dangerouslySetInnerHTML={
                        {
                            __html: '<svg style="width: 20px" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg>'
                        }
                    }
                ></span>
                <span>
                    {showAns}
                </span>
            </ResultContainer>
            <InputElement >
                {showFunc}
            </InputElement>
        </InputWrapper>
    )
}