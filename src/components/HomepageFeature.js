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

const Description = styled.div`
  color: white;
`

const MainText = styled.p`
  padding-top: 1em;
  padding-bottom: 2em;
`

type Props = {|
  imageFluid: Object,
  imageAltText: ?string,
  title: string,
  descriptionHtml: string,
|}

const HomepageFeature = ({
  imageFluid,
  title,
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
            <Description
              dangerouslySetInnerHTML={{
                __html: descriptionHtml,
              }}
            />
          </PageGutter>
        </ImageExtras>
      </ImageContainer>
      <PageGutter>
        <MainText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </MainText>
      </PageGutter>
    </Main>
  )
}

export default HomepageFeature
