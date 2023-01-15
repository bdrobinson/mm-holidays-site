import React, { FC } from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import PageGutter from "./PageGutter"
import RemarkText from "./RemarkText"

const IMAGE_MAX_HEIGHT = 600
const IMAGE_MIN_HEIGHT = 400

const Main = styled.section``

// @ts-ignore
const Image = styled(GatsbyImage)`
  max-height: ${IMAGE_MAX_HEIGHT}px;
  min-height: ${IMAGE_MIN_HEIGHT}px;
`

const ImageContainer = styled.div`
  position: relative;
  max-height: ${IMAGE_MAX_HEIGHT}px;
  min-height: ${IMAGE_MIN_HEIGHT}px;
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

interface Props {
  image: any
  imageAltText: string
  title: string
  subtitle: string
  descriptionHtml: string
}

const HomepageFeature: FC<Props> = ({
  image,
  title,
  subtitle,
  descriptionHtml,
  imageAltText,
}: Props) => {
  return (
    <Main>
      <ImageContainer>
        <Image
          image={image}
          alt={imageAltText}
          imgStyle={{
            objectPosition: "center",
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
          <RemarkText innerHTML={descriptionHtml} />
        </Description>
      </PageGutter>
    </Main>
  )
}

export default HomepageFeature
