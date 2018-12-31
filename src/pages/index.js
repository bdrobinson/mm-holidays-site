// @flow

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/Layout"
import HomepageFeature from "../components/HomepageFeature"
import PageGutter from "../components/PageGutter"
import ImageCrossfade from "../components/ImageCrossfade"
import {
  SMALLSCREEN_WIDTH,
  MOBILE_WIDTH,
  HERO_IMAGE_MAX_HEIGHT,
  PRIMARY_COLOUR_DARK,
} from "../constants"
import HeroBookingPrompt from "../components/HeroBookingPrompt"
import FooterBookingPrompt from "../components/FooterBookingPrompt"

const HeroContainer = styled.div`
  position: relative;
`

const VIDEO_ID = "d24Pm3NxFVA"

const HeroLabelContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`

const Tagline = styled.h1`
  color: white;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  letter-spacing: 1.5px;
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    font-size: 2rem;
  }
`

const PromoVideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  margin-bottom: 4em;
`

const PromoVideo = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const HeroBookingNoticeContainer = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font-size: 0.8rem;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.3);
  border-width: 6px;
  border-color: white;
  border-style: solid;
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    display: none;
  }
`

const BodyBookingNoticeContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  font-size: 0.9rem;
  background-color: ${PRIMARY_COLOUR_DARK};
  color: white;
  & > * {
    width: 70%;
    @media (max-width: ${MOBILE_WIDTH}px) {
      width: 100%;
      max-width: 100%;
    }
  }
`

const BookingNoticeSection = styled.section`
  @media (min-width: ${SMALLSCREEN_WIDTH}px) {
    display: none;
  }
`

type Props = {| data: Object |}

const IndexPage = ({ data }: Props) => (
  <Layout
    title={null}
    theme="light"
    applyGutter={false}
    seoDescription={data.site.siteMetadata.seoDescription}
    hero={
      <HeroContainer>
        <ImageCrossfade
          fluids={[
            data.hero1.childImageSharp.fluid,
            data.hero2.childImageSharp.fluid,
            data.hero3.childImageSharp.fluid,
          ]}
          renderImage={fluid => {
            return (
              <Img
                fluid={fluid}
                style={{ maxHeight: `${HERO_IMAGE_MAX_HEIGHT}px` }}
                imgStyle={{ objectPosition: "center" }}
              />
            )
          }}
        />
        <HeroLabelContainer>
          <div>
            <PageGutter>
              <Tagline>Get ready for the best week of the year...</Tagline>
            </PageGutter>
          </div>
        </HeroLabelContainer>
        <HeroBookingNoticeContainer>
          <HeroBookingPrompt />
        </HeroBookingNoticeContainer>
      </HeroContainer>
    }
  >
    <BookingNoticeSection>
      <BodyBookingNoticeContainer>
        <PageGutter>
          <HeroBookingPrompt />
        </PageGutter>
      </BodyBookingNoticeContainer>
    </BookingNoticeSection>
    <section>
      <PageGutter>
        <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
        <PromoVideoContainer>
          <PromoVideo
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?&autoplay=1&rel=0&mute=1&modestbranding=1&loop=1&playlist=${VIDEO_ID}&fs=1`}
            frameBorder="0"
            allow="fullscreen;"
          />
        </PromoVideoContainer>
      </PageGutter>
    </section>
    {data.allMarkdownRemark.edges.map(edge => {
      const frontmatter = edge.node.frontmatter
      return (
        <HomepageFeature
          key={edge.node.id}
          imageFluid={frontmatter.image.childImageSharp.fluid}
          imageAltText={frontmatter.imageAltText}
          title={frontmatter.title}
          subtitle={frontmatter.subtitle}
          descriptionHtml={edge.node.html}
        />
      )
    })}
    <section>
      <FooterBookingPrompt />
    </section>
  </Layout>
)

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        seoDescription
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//home/sections//" } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            order
            imageAltText
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          html
        }
      }
    }
    hero1: file(relativePath: { eq: "inflatables.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hero2: file(relativePath: { eq: "sunset.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    hero3: file(relativePath: { eq: "tires.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: { regex: "/home/intro/" }) {
      html
    }
  }
`

export default IndexPage
