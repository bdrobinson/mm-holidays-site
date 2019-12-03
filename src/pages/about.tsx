
import React, { FC } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"

interface Props { data: any }

const IndexPage: FC<Props> = ({ data }) => (
  <Layout
    path="/about"
    title="About"
    hero={
      <HeroImage
        imageAltText="Campers playing laser tag in the woods on site."
        fluid={data.hero.childImageSharp.fluid}
        title="About us"
      />
    }
    theme="light"
    seoDescription="The history of M+M and general information about camp."
  >
    {data.allMarkdownRemark.edges.map((edge: any) => {
      const fluid: any | null = edge.node.frontmatter.image?.childImageSharp.fluid
      return (
        <section key={edge.node.id}>
          <h1>{edge.node.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
          {fluid != null && <Img fluid={fluid} />}
        </section>
      )
    })}
  </Layout>
)

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//about//" } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            order
            image {
              childImageSharp {
                ...FluidHeroImage
              }
            }
          }
          html
        }
      }
    }
    hero: file(relativePath: { eq: "lasertag_walking.jpg" }) {
      childImageSharp {
        ...FluidHeroImage
      }
    }
  }
`

export default IndexPage
