// @flow

import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"

type Props = {| data: Object |}

const IndexPage = ({ data }: Props) => (
  <Layout title="About">
    {data.allMarkdownRemark.edges.map(edge => {
      return (
        <section key={edge.node.id}>
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
          id
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
