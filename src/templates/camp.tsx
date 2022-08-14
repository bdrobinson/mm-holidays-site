import React, { FC } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import CampDatesCTA from "../components/CampDatesCTA"
import PageGutter from "../components/PageGutter"
import HeroImage from "../components/HeroImage"
import { SMALLSCREEN_WIDTH } from "../constants"
import HeadTags from "../components/HeadTags"

const HeroCampDates = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  padding-top: 7rem;
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

interface Props {
  data: any
}

export const Head = ({ data }: Props) => {
  const meta = data.markdownRemark.frontmatter
  return (
    <HeadTags
      path={meta.path}
      title={meta.title}
      seoDescription={meta.description}
    />
  )
}

const Camp: FC<Props> = ({ data }: Props) => {
  const meta = data.markdownRemark.frontmatter
  return (
    <Layout
      theme="light"
      hero={
        <HeroImage
          fluid={meta.hero.childImageSharp.fluid}
          title={meta.title}
          subtitle={`Age ${meta.ages}`}
          imageAltText={meta.heroAltText}
        >
          <HeroCampDates>
            <PageGutter>
              <CampDatesCTA
                shadows={true}
                campName={meta.title}
                price={meta.price}
              />
            </PageGutter>
          </HeroCampDates>
        </HeroImage>
      }
    >
      <BodyCampDates>
        <CampDatesCTA
          shadows={false}
          campName={meta.title}
          price={meta.price}
        />
      </BodyCampDates>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  )
}

export default Camp

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        price
        title
        description
        ages
        hero {
          childImageSharp {
            ...FluidHeroImage
          }
        }
        heroAltText
      }
    }
  }
`
