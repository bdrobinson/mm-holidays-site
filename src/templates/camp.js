// @flow

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/Layout"
import { HERO_IMAGE_MAX_HEIGHT } from "../constants"

const HeroContainer = styled.div`
  position: relative;
`

const HeroOverlay = styled.div`
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

const HeroTitle = styled.h1`
  font-size: 7rem;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 0;
`

const HeroSubtitle = styled.span`
  font-size: 3rem;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  font-weight: 600;
`

type Props = {|
  data: Object,
|}

const Camp = ({ data }: Props) => {
  const meta = data.markdownRemark.frontmatter
  return (
    <Layout
      title={meta.title}
      theme="light"
      hero={
        <HeroContainer>
          <Img
            fluid={meta.hero.childImageSharp.fluid}
            style={{ maxHeight: `${HERO_IMAGE_MAX_HEIGHT}px` }}
            imgStyle={{ objectPosition: "center" }}
          />
          <HeroOverlay>
            <HeroTitle>{meta.title}</HeroTitle>
            <HeroSubtitle>Age {meta.ages}</HeroSubtitle>
          </HeroOverlay>
        </HeroContainer>
      }
    >
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      {meta.sections.map(section => {
        return (
          <div
            key={section.id}
            dangerouslySetInnerHTML={{
              __html: section.childMarkdownRemark.html,
            }}
          />
        )
      })}
    </Layout>
  )
}

export default Camp

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        price
        title
        ages
        sections {
          id
          childMarkdownRemark {
            html
          }
        }
        hero {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
