// @flow

import React, { useState } from "react"
import { graphql } from "gatsby"

import BookingForm from "../components/BookingForm"
import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"
import Unknown404 from "./404"
import { ENABLE_BOOKING } from "../constants"

type Props = {| data: Object |}

const Booking = ({ data }: Props) => {
  const [booked, setBooked] = useState(false)

  if (ENABLE_BOOKING === false) {
    return <Unknown404 />
  }
  return (
    <Layout
      path={data.markdownRemark.frontmatter.path}
      title="Book"
      hero={
        <HeroImage
          imageAltText="Max campers at the last night party."
          fluid={data.hero.childImageSharp.fluid}
          title="Book your place"
        />
      }
      theme="light"
      seoDescription={data.markdownRemark.frontmatter.description}
    >
      {booked && (
        <p>
          Thank you for applying to M+M 2020! We&apos;ve received your
          application. Please check your inbox for a confirmation email.
        </p>
      )}
      {booked === false && (
        <>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <BookingForm
            onComplete={() => {
              setBooked(true)
            }}
          />
        </>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    markdownRemark(fileAbsolutePath: { regex: "//booking/intro.md/" }) {
      frontmatter {
        description
        path
      }
      html
    }
    hero: file(relativePath: { eq: "eating_pancakes.jpg" }) {
      childImageSharp {
        ...FluidHeroImage
      }
    }
  }
`

export default Booking
