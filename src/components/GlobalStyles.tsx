import { createGlobalStyle } from "styled-components"

import {
  MOBILE_WIDTH,
  BODY_COLOUR,
  ACCENT_COLOUR,
  PRIMARY_COLOUR_DARK,
} from "../constants"

// @ts-ignore
const GlobalStyles: React.FC<{
  children?: React.ReactNode
}> = createGlobalStyle`
    html {
        font-size: 16px;
        @media (max-width: ${MOBILE_WIDTH}px) {
            font-size: 14px;
        }
        height: 100%;
    }
    body {
        font-family: 'Raleway', sans-serif;
        font-size: 1rem;
        height: 100%;  
        color: ${BODY_COLOUR};       
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
        @media (max-width: ${MOBILE_WIDTH}px) {
            font-weight: 400;
        }
        line-height: 1.5;
        margin: 0.6em 0;
    }
    h1 {
        font-size: 3.5rem;
        margin-top: 2rem;
        margin-bottom: 0.8rem;
    }

    h2 {
        margin-top: 1em;
        margin-bottom: 0;
    }

    blockquote {
        border-left: 2px solid ${PRIMARY_COLOUR_DARK};
        margin: 0;
        padding: 0.1em 2em;
        background-color: hsla(0,0%,97%);
        border-top-right-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
    }

    footer {
    }

    a {
        color: ${ACCENT_COLOUR};
        text-decoration: none;
        font-weight: 500;
    }

    a:hover {
        text-decoration: underline;
    }

    strong {
        font-weight: bold;
    }
`

export default GlobalStyles
