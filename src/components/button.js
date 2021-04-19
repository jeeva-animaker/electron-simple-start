import React from 'react';
import styled from "styled-components";

export const Button = styled.div`
    ${({ theme, variant, fontSize, color }) => {
        let backgroundColor = theme.colors.grey.dark
        color = color || theme.colors.grey.darkest
        fontSize = fontSize || theme.fontSizes.sm

        if (variant === 'primary') {
            backgroundColor = theme.colors.primary.dark
            color = theme.colors.white.dark
        } else if (variant === 'light') {
            backgroundColor = theme.colors.grey.lighter
            color = theme.colors.grey.darkest
        }

        return `
                background-color: ${backgroundColor};
                color: ${color};
                font-size: ${fontSize};
            `
    }}
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`