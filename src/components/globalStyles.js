import React from 'react';
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.colors.white.dark};
        color: ${props => props.theme.colors.black.dark};
        font-family: ${props => props.theme.fontFamily};
        font-size: ${props => props.theme.fontSizes.md}
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`