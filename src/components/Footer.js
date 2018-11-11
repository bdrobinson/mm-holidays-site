// @flow

import React from "react"
import styled from "styled-components"

import PageGutter from "./PageGutter"

const FooterMain = styled.footer`
  margin-bottom: 1rem;
  margin-top: 2rem;
`

const Footer = () => (
  <FooterMain>
    <PageGutter>&copy; M+M Holidays 2018</PageGutter>
  </FooterMain>
)

export default Footer
