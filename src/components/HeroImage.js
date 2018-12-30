// @flow

import React, { type Node } from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import { HERO_IMAGE_MAX_HEIGHT, TINY_WIDTH } from "../constants"
import PageGutter from "./PageGutter"

const Main = styled.div`
  position: relative;
`

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 6rem;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 0;
  text-align: center;
  @media (max-width: ${TINY_WIDTH}px) {
    font-size: 4rem;
  }
`

const Subtitle = styled.div`
  font-size: 3rem;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  font-weight: 600;
  text-align: center;
  @media (max-width: ${TINY_WIDTH}px) {
    font-size: 2rem;
  }
`

type Props = {|
  fluid: Object,
  title: string,
  subtitle?: ?string,
  children?: Node,
|}

const HeroImage = ({ fluid, title, subtitle, children }: Props) => {
  return (
    <Main>
      <Img
        fluid={fluid}
        style={{ maxHeight: `${HERO_IMAGE_MAX_HEIGHT}px` }}
        imgStyle={{ objectPosition: "center" }}
      />
      <Overlay>
        <PageGutter>
          <Title>{title}</Title>
          {subtitle != null && <Subtitle>{subtitle}</Subtitle>}
        </PageGutter>
      </Overlay>
      {children != null && children}
    </Main>
  )
}

export default HeroImage
