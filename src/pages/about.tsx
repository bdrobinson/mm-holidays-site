import React, { FC } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"
import HeadTags from "../components/HeadTags"
import { getImage } from "gatsby-plugin-image"
import RemarkText from "../components/RemarkText"

interface Props {
  data: any
}

export const Head = () => {
  return (
    <HeadTags
      path="/about"
      title="About"
      seoDescription="The history of M+M and general information about camp."
    />
  )
}

const IndexPage: FC<Props> = ({ data }: Props) => (
  <Layout
    hero={
      <HeroImage
        imageAltText="Campers playing laser tag in the woods on site."
        image={getImage(data.hero)}
        title="About us"
      />
    }
    theme="light"
  >
    {data.allMarkdownRemark.edges.map((edge: any) => {
      return (
        <section key={edge.node.id}>
          <h1>{edge.node.frontmatter.title}</h1>
          <RemarkText innerHTML={edge.node.html} />
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
    hero: file(relativePath: { eq: "lasertag_walking.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90, placeholder: BLURRED)
      }
    }
  }
`

export default IndexPage
