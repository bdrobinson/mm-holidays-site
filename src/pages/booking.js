// @flow

import React from "react"
import { graphql } from "gatsby"

import BookingForm from "../components/BookingForm"
import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"

type Props = {| data: Object |}

const Booking = ({ data }: Props) => {
  return (
    <Layout
      title="Book"
      hero={
        <HeroImage
          fluid={data.hero.childImageSharp.fluid}
          title="Book your place"
        />
      }
      theme="light"
      seoDescription={data.markdownRemark.frontmatter.description}
    >
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <BookingForm />
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "//booking/intro.md/" }) {
      frontmatter {
        description
      }
      html
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

export default Booking
