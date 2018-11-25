// @flow

import React, { type Node } from "react"
import styled from "styled-components"

import { MOBILE_WIDTH } from "../constants"

const Main = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`

const Content = styled.div`
  flex-shrink: 1;
  flex-grow: 0;
  flex-basis: 1100px;
  padding: 0 1.45rem;
  @media (max-width: ${MOBILE_WIDTH}px) {
    padding: 0 2rem;
  }
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
