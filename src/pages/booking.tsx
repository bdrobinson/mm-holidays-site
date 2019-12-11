import React, { FC, useState } from "react"
import { graphql } from "gatsby"

import BookingForm, { FormState } from "../components/BookingForm"
import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"
import Button from "../components/Button"

interface Props {
  data: any
}

const Booking: FC<Props> = ({ data }: Props) => {
  const [booked, setBooked] = useState(false)
  const [previousState, setPreviousState] = useState<FormState | null>(null)

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
          <p>
            <Button
              onClick={() => {
                setBooked(false)
              }}
            >
              Book another child
            </Button>
          </p>
        </>
      )}
      {booked === false && (
        <>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <BookingForm
            onComplete={formState => {
              setPreviousState(
                formState != null
                  ? {
                      title: formState.title,
                      parentFirstName: formState.parentFirstName,
                      parentLastName: formState.parentLastName,
                      parentRelationshipToChild:
                        formState.parentRelationshipToChild,
                      parentAddressLine1: formState.parentAddressLine1,
                      parentAddressLine2: formState.parentAddressLine2,
                      parentAddressCity: formState.parentAddressCity,
                      parentAddressCounty: formState.parentAddressCounty,
                      parentPostcode: formState.parentPostcode,
                      parentMobilePhone: formState.parentMobilePhone,
                      parentDaytimePhone: formState.parentDaytimePhone,
                      parentEveningPhone: formState.parentEveningPhone,
                      parentEmail: formState.parentEmail,
                    }
                  : null,
              )
              setBooked(true)
            }}
            initialState={previousState}
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
