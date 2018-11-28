// @flow

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { setConfig } from "react-hot-loader"

import Layout from "../components/Layout"
import HomepageFeature from "../components/HomepageFeature"
import PageGutter from "../components/PageGutter"

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
  color: white;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-align: center;
`

const HeroLabel = styled.div``

const IntroSection = styled.section``

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

type Props = {| data: Object |}

const IndexPage = ({ data }: Props) => (
  <Layout
    title={null}
    theme="light"
    applyGutter={false}
    hero={
      <HeroContainer>
        <Img
          fluid={data.hero1.childImageSharp.fluid}
          style={{ maxHeight: "800px" }}
          imgStyle={{ objectPosition: "top" }}
        />
        <HeroLabelContainer>
          <HeroLabel>
            <PageGutter>
              <h1>The best week of the year</h1>
            </PageGutter>
          </HeroLabel>
        </HeroLabelContainer>
      </HeroContainer>
    }
  >
    <IntroSection>
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
    </IntroSection>
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
