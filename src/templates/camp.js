// @flow

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/Layout"
import CampDatesCTA from "../components/CampDatesCTA"
import PageGutter from "../components/PageGutter"
import {
  HERO_IMAGE_MAX_HEIGHT,
  SMALLSCREEN_WIDTH,
  TINY_WIDTH,
} from "../constants"

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

const HeroCampDates = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  padding-top: 4rem;
  padding-bottom: 1rem;
  font-size: 1.6rem;
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    display: none;
  }
`

const BodyCampDates = styled.section`
  margin: 1em 0;
  font-size: 1.4rem;
  @media (min-width: ${SMALLSCREEN_WIDTH}px) {
    display: none;
  }
`

const HeroTitle = styled.h1`
  font-size: 7rem;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 0;
  @media (max-width: ${TINY_WIDTH}px) {
    font-size: 4rem;
  }
`

const HeroSubtitle = styled.span`
  font-size: 3rem;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  font-weight: 600;
  @media (max-width: ${TINY_WIDTH}px) {
    font-size: 2rem;
  }
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
          <HeroCampDates>
            <PageGutter>
              <CampDatesCTA shadows={true} campName={meta.title} />
            </PageGutter>
          </HeroCampDates>
        </HeroContainer>
      }
    >
      <BodyCampDates>
        <CampDatesCTA shadows={false} campName={meta.title} />
      </BodyCampDates>
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
