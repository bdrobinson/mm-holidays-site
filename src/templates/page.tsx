import React, { FC } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

interface Props {
  data: any
}

const Template: FC<Props> = ({ data }: Props) => {
  const title = data.markdownRemark.frontmatter.title
  const description = data.markdownRemark.frontmatter.description
  return (
    <Layout
      title={title}
      seoDescription={description}
      path={data.markdownRemark.frontmatter.path}
    >
      <section>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </section>
    </Layout>
  )
}

export default Template

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
