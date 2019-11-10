import React, { FC } from "react"
import styled from "styled-components"

import PageGutter from "./PageGutter"
import { FOOTER_BG, FOOTER_TEXT } from "../constants"

const FooterMain = styled.footer`
  background-color: ${FOOTER_BG};
  color: ${FOOTER_TEXT};
  padding: 2rem 0;
  text-align: left;
`

interface Props {}

const Footer: FC<Props> = () => (
  <FooterMain>
    <PageGutter>
      <span>&copy; M+M Holidays 2019</span>
    </PageGutter>
  </FooterMain>
)

export default Footer
