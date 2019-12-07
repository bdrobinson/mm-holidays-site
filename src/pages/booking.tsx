import React, { FC, useState } from "react"
import { graphql } from "gatsby"

import BookingForm from "../components/BookingForm"
import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"

interface Props {
  data: any
}

const Booking: FC<Props> = ({ data }: Props) => {
  const [booked, setBooked] = useState(false)

  return (
    <Layout
      path={data.markdownRemark.frontmatter.path}
      title="Book"
      hero={
        <HeroImage
          imageAltText="Max campers at the last night party."
          fluid={data.hero.childImageSharp.fluid}
          title={booked ? "Thanks!" : "Book your place"}
        />
      }
      theme="light"
      seoDescription={data.markdownRemark.frontmatter.description}
    >
      {booked && (
        <>
          <h2>Thank you for applying to M+M 2020!</h2>
          <p>
            We&apos;ve received your application. Please check your inbox for a
            confirmation email and{" "}
            <a href="mailto:info@madnessandmayhem.org.uk">contact us</a> if you
            do not receive one.
          </p>
        </>
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
