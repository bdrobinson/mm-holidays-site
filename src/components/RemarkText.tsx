import React from "react"
import styled from "styled-components"
import { MOBILE_WIDTH } from "../constants"

const Main = styled.div`
  font-size: 1.3rem;

  li {
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 300;
    @media (max-width: ${MOBILE_WIDTH}px) {
      font-weight: 400;
    }
  }
`

type Props = {
  innerHTML: any
}

const RemarkText: React.FC<Props> = ({ innerHTML }) => {
  return <Main dangerouslySetInnerHTML={{ __html: innerHTML }} />
}

export default RemarkText
