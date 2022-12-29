import React from "react"
import styled from "styled-components"

const Main = styled.div`
  font-size: 1.3rem;

  li {
    margin-bottom: 0.5rem;
  }
`

type Props = {
  innerHTML: any
}

const RemarkText: React.FC<Props> = ({ innerHTML }) => {
  return <Main dangerouslySetInnerHTML={{ __html: innerHTML }} />
}

export default RemarkText
