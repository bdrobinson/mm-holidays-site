// @flow

import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"

const IndexPage = ({ data }) => (
  <Layout title={null}>
    <h1>The best week of the year</h1>
    {data.allMarkdownRemark.edges.map(edge => {
      console.log(edge.node.frontmatter.image.childImageSharp)
      return (
        <section key={edge.node.id}>
          <h2>{edge.node.frontmatter.title}</h2>
          <Img fluid={edge.node.frontmatter.image.childImageSharp.fluid} />
          <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
        </section>
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
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
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
