// @flow

import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import HomepageFeature from "../components/HomepageFeature"

const IndexPage = ({ data }) => (
  <Layout title={null} applyGutter={false}>
    <h1>The best week of the year</h1>
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
      filter: { fileAbsolutePath: { regex: "//home//" } }
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
  }
`

export default IndexPage
