// @flow

import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import PageGutter from "./PageGutter"

const Main = styled.section``

const Image = styled(Img)``

const IMAGE_HEIGHT = 600

const ImageContainer = styled.div`
  position: relative;
  max-height: ${IMAGE_HEIGHT}px;
  overflow: hidden;
`

const ImageExtras = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
`

const Title = styled.h2`
  color: white;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0px;
`

const Subtitle = styled.p`
  margin-top: 0;
  color: white;
`

const Description = styled.div`
  padding-top: 1em;
  padding-bottom: 2em;
`

type Props = {|
  imageFluid: Object,
  imageAltText: ?string,
  title: string,
  subtitle: string,
  descriptionHtml: string,
|}

const HomepageFeature = ({
  imageFluid,
  title,
  subtitle,
  descriptionHtml,
  imageAltText,
}: Props) => {
  return (
    <Main>
      <ImageContainer>
        <Image
          fluid={imageFluid}
          alt={imageAltText}
          imgStyle={{
            maxHeight: IMAGE_HEIGHT,
          }}
        />
        <ImageExtras>
          <PageGutter>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </PageGutter>
        </ImageExtras>
      </ImageContainer>
      <PageGutter>
        <Description>
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </Description>
      </PageGutter>
    </Main>
  )
}

export default HomepageFeature
