// @flow

import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"

export default function Template({ data }) {
  const title = data.markdownRemark.frontmatter.title
  return (
    <Layout title={title}>
      <section>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
