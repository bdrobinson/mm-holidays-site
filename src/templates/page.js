// @flow

import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"

type Props = {|
  data: Object,
|}

export default function Template({ data }: Props) {
  const title = data.markdownRemark.frontmatter.title
  const description = data.markdownRemark.frontmatter.description
  return (
    <Layout title={title} seoDescription={description}>
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
        description
      }
    }
  }
`
