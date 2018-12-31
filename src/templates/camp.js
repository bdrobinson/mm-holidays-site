// @flow

import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import CampDatesCTA from "../components/CampDatesCTA"
import PageGutter from "../components/PageGutter"
import HeroImage from "../components/HeroImage"
import { SMALLSCREEN_WIDTH } from "../constants"

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

type Props = {|
  data: Object,
|}

const Camp = ({ data }: Props) => {
  const meta = data.markdownRemark.frontmatter
  return (
    <Layout
      path={meta.path}
      title={meta.title}
      theme="light"
      seoDescription={meta.description}
      hero={
        <HeroImage
          fluid={meta.hero.childImageSharp.fluid}
          title={meta.title}
          subtitle={`Age ${meta.ages}`}
        >
          <HeroCampDates>
            <PageGutter>
              <CampDatesCTA shadows={true} campName={meta.title} />
            </PageGutter>
          </HeroCampDates>
        </HeroImage>
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
        path
        price
        title
        description
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
