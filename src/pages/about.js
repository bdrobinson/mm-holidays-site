// @flow

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"

type Props = {| data: Object |}

const IndexPage = ({ data }: Props) => (
  <Layout
    title="About"
    hero={
      <HeroImage fluid={data.hero.childImageSharp.fluid} title="About us" />
    }
    theme="light"
  >
    {data.allMarkdownRemark.edges.map(edge => {
      const fluid: ?Object = edge.node.frontmatter.image?.childImageSharp.fluid
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
    hero: file(relativePath: { eq: "inflatables.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
