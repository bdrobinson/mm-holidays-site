import React, { ReactNode, FC } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import {
  HERO_IMAGE_MAX_HEIGHT,
  HERO_IMAGE_MIN_HEIGHT,
  TINY_WIDTH,
} from "../constants"
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
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
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

const Image = styled(Img)`
  max-height: ${HERO_IMAGE_MAX_HEIGHT}px;
  min-height: ${HERO_IMAGE_MIN_HEIGHT}px;
`

interface Props {
  fluid: any
  imageAltText: string
  title: string
  subtitle?: string | null
  children?: ReactNode
}

const HeroImage: FC<Props> = ({
  fluid,
  title,
  subtitle,
  children,
  imageAltText,
}) => {
  return (
    <Main>
      <Image
        fluid={fluid}
        imgStyle={{ objectPosition: "center" }}
        alt={imageAltText}
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

export const FluidHeroImage = graphql`
  fragment FluidHeroImage on ImageSharp {
    fluid(
      maxWidth: 1920
      srcSetBreakpoints: [400, 600, 960, 1280, 1600, 1920]
      quality: 80
    ) {
      ...GatsbyImageSharpFluid_withWebp
    }
  }
`
