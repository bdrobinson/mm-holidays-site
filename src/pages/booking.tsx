import React, { FC } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"
import HeadTags from "../components/HeadTags"
import { getImage } from "gatsby-plugin-image"

interface Props {
  data: any
}

export const Head = () => {
  return (
    <HeadTags
      path="/booking"
      title="Book"
      seoDescription="Book onto Madness and Mayhem here!"
    />
  )
}
type Week = {
  shortDates: string
}

type CampWeek = {
  number: string
  shortDates: string
  camps: Array<{
    name: string
    age: string
    link: string
  }>
}

const Booking: FC<Props> = ({ data }: Props) => {
  console.log("rendering")
  const [week1, week2]: [Week, Week] = data.site.siteMetadata.campWeeks
  const campWeeks: Array<CampWeek> = [
    {
      number: "1",
      shortDates: week1.shortDates,
      camps: [
        {
          name: "Max 1",
          age: "9-11",
          link: "https://www.ventures.org.uk/holiday/mm-1-max?token=1",
        },
        {
          name: "Madness 1",
          age: "12-14",
          link: "https://www.ventures.org.uk/holiday/mm-1-madness?token=2",
        },
        {
          name: "Mayhem 1",
          age: "15-18",
          link: "https://www.ventures.org.uk/holiday/mm-1-mayhem?token=3",
        },
      ],
    },
    {
      number: "2",
      shortDates: week2.shortDates,
      camps: [
        {
          name: "Max 2",
          age: "9-11",
          link: "https://www.ventures.org.uk/holiday/mm-2-max?token=4",
        },
        {
          name: "Madness 2",
          age: "12-14",
          link: "https://www.ventures.org.uk/holiday/mm-2-madness?token=5",
        },
        {
          name: "Mayhem 2",
          age: "15-18",
          link: "https://www.ventures.org.uk/holiday/mm-2-mayhem?token=6",
        },
      ],
    },
  ]
  return (
    <Layout
      hero={
        <HeroImage
          imageAltText="A camper on the bungee run at the M+M party."
          image={getImage(data.hero)}
          title="Book your place"
        />
      }
      theme="light"
    >
      <p>
        You can book onto M+M on the website of Ventures, our parent
        organisation. Here are the links:
      </p>
      {campWeeks.map(({ number, camps, shortDates }) => {
        return (
          <section key={number}>
            <h2>
              Week {number} ({shortDates})
            </h2>
            {camps.map(({ name, age, link }) => {
              return (
                <p key={name}>
                  {name} (age {age}): <a href={link}>Book</a>
                </p>
              )
            })}
          </section>
        )
      })}
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
    }
    hero: file(relativePath: { eq: "bungee_run_2022.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90, placeholder: BLURRED)
      }
    }
    site {
      siteMetadata {
        campWeeks {
          week
          shortDates
        }
      }
    }
  }
`

export default Booking
