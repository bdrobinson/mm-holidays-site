import styled from "styled-components"

import { GREY_BORDER_COLOUR } from "../constants"

const Button = styled.button.attrs({ type: "button" })`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: 1px solid ${GREY_BORDER_COLOUR};
  font-size: 0.8em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

export default Button
