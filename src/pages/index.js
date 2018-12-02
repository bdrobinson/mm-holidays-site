// @flow

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { setConfig } from "react-hot-loader"

import Layout from "../components/Layout"
import HomepageFeature from "../components/HomepageFeature"
import PageGutter from "../components/PageGutter"
import ImageCrossfade from "../components/ImageCrossfade"
import { SMALLSCREEN_WIDTH, MOBILE_WIDTH } from "../constants"
import HeroBookingPrompt from "../components/HeroBookingPrompt"

// Needed to make react hooks work with HMR
setConfig({ pureSFC: true })

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
  text-transform: uppercase;
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    font-size: 2.5rem;
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
  bottom: 0;
  right: 0;
  padding-bottom: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font-size: 0.8rem;
  width: 600px;
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    display: none;
  }
`

const BodyBookingNoticeContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  margin-top: 1em;
  font-size: 0.9rem;
  & > * {
    width: 70%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
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
    hero={
      <HeroContainer>
        <ImageCrossfade
          fluids={[
            data.hero0.childImageSharp.fluid,
            data.hero1.childImageSharp.fluid,
            data.hero2.childImageSharp.fluid,
            data.hero3.childImageSharp.fluid,
          ]}
          renderImage={fluid => {
            return (
              <Img
                fluid={fluid}
                style={{ maxHeight: "800px" }}
                imgStyle={{ objectPosition: "center" }}
              />
            )
          }}
        />
        <HeroLabelContainer>
          <div>
            <PageGutter>
              <Tagline>The best week of the year</Tagline>
            </PageGutter>
          </div>
        </HeroLabelContainer>
        <HeroBookingNoticeContainer>
          <PageGutter>
            <HeroBookingPrompt />
          </PageGutter>
        </HeroBookingNoticeContainer>
      </HeroContainer>
    }
  >
    <BookingNoticeSection>
      <PageGutter>
        <BodyBookingNoticeContainer>
          <HeroBookingPrompt />
        </BodyBookingNoticeContainer>{" "}
      </PageGutter>
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
          descriptionHtml={edge.node.html}
        />
      )
    })}
  </Layout>
)

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//home/sections//" } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
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
    hero0: file(relativePath: { eq: "hero0.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
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
