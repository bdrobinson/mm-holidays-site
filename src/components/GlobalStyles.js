// @flow

import { createGlobalStyle } from "styled-components"

import { MOBILE_WIDTH } from "../constants"

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
        @media (max-width: ${MOBILE_WIDTH}px) {
            font-size: 12px;
        }
        height: 100%;
    }
    body {
        font-family: 'Raleway', sans-serif;
        font-size: 1rem;
        height: 100%;
    }
    #___gatsby {
        height: 100%;
    }
    #___gatsby>div {
        height: 100%;
    }

    p {
        font-size: 1.3rem;
        font-weight: 300;
        line-height: 1.5;
    }
    h1 {
        font-size: 3.5rem;
        margin-top: 2rem;
        margin-bottom: 0.8rem;
    }

    footer {
    }
`

export default GlobalStyles
