// @flow

import React, { type Node } from "react"
import styled from "styled-components"

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`

const Content = styled.div`
  flex-shrink: 1;
  flex-grow: 0;
  flex-basis: 1000px;
  padding: 0 1.45rem;
`

type Props = {|
  children: Node,
|}

const PageGutter = ({ children }: Props) => (
  <Main>
    <Content>{children}</Content>
  </Main>
)

export default PageGutter
