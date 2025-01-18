import React, { FC, useState } from "react"
import { graphql } from "gatsby"

import BookingForm, { FormState } from "../components/BookingForm"
import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"
import Button from "../components/Button"
import { MOBILE_WIDTH } from "../constants"
import HeadTags from "../components/HeadTags"
import { getImage } from "gatsby-plugin-image"
import RemarkText from "../components/RemarkText"

interface Props {
  data: any
}

export const Head = ({ data }: Props) => {
  return (
    <HeadTags
      ogImageRelativeUrl={data.hero.childImageSharp.ogImage.src}
      path={data.markdownRemark.frontmatter.path}
      title="Book"
      seoDescription={data.markdownRemark.frontmatter.description}
    />
  )
}

const Booking: FC<Props> = ({ data }: Props) => {
  const [booked, setBooked] = useState(false)
  const [previousState, setPreviousState] = useState<FormState | null>(null)

  return (
    <Layout
      hero={
        <HeroImage
          imageAltText="A camper on the bungee run at the M+M party."
          image={getImage(data.hero)}
          title={booked ? "Thanks!" : "Book your place"}
        />
      }
      theme="light"
    >
      {booked && (
        <>
          <h2>Thank you for applying to M+M 2025!</h2>
          <p>
            We&apos;ve received your application. Please check your inbox for a
            confirmation email and{" "}
            <a href="mailto:bookings@madnessandmayhem.org.uk">contact us</a> if
            you do not receive one.
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
        <div
          css={`
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            & > * {
              max-width: ${MOBILE_WIDTH}px;
            }
            & h2 {
              font-family: Raleway;
              font-weight: 700;
            }
          `}
        >
          <RemarkText innerHTML={data.markdownRemark.html} />
          <BookingForm
            onComplete={formState => {
              setPreviousState(formState)
              setBooked(true)
            }}
            initialState={
              previousState !== null
                ? {
                    title: previousState.title,
                    parentFirstName: previousState.parentFirstName,
                    parentLastName: previousState.parentLastName,
                    parentRelationshipToChild:
                      previousState.parentRelationshipToChild,
                    parentAddressLine1: previousState.parentAddressLine1,
                    parentAddressLine2: previousState.parentAddressLine2,
                    parentAddressCity: previousState.parentAddressCity,
                    parentAddressCounty: previousState.parentAddressCounty,
                    parentPostcode: previousState.parentPostcode,
                    parentEmail: previousState.parentEmail,
                  }
                : null
            }
          />
        </div>
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
    hero: file(relativePath: { eq: "bungee_run_2022.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90, placeholder: BLURRED)
        ogImage: fixed(width: 1200) {
          src
        }
      }
    }
  }
`

export default Booking
