// @flow

import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"

const IndexPage = ({ data }) => (
  <Layout title="About">
    {data.allMarkdownRemark.edges.map(edge => {
      return (
        <section>
          <h1>{edge.node.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
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
          frontmatter {
            title
            order
          }
          html
        }
      }
    }
  }
`

export default IndexPage
