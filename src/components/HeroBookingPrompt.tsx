import styled from "styled-components"
import React, { FC } from "react"

import { TINY_WIDTH, ENABLE_BOOKING } from "../constants"
import BookButton from "./BookButton"
import { graphql, useStaticQuery } from "gatsby"

const Main = styled.div`
  overflow: auto;
  padding: 1.8em;
`

const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
`

const Title = styled.h2`
  text-align: center;
  margin-top: 0;
`

const BookingNoticeText = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  padding-right: 1.5em;
  margin: 0;
  font-size: 1em;
`

const BookingNoticeRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0.8em 0;
  font-size: 1.2em;
  align-items: center;
  @media (max-width: ${TINY_WIDTH}px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

const BookingNoticeLabel = styled.div`
  font-weight: bold;
  margin-right: 0.8em;
  flex: 0 0 auto;
`

// const PillContainer = styled.div`
//   font-size: 0.8em;
//   padding-left: 0.8em;
//   text-align: center;
//   @media (min-width: ${TINY_WIDTH}px) {
//     max-width: 5em;
//   }
// `

const Paragraph = styled.div`
  & > p {
    font-size: 1.2em;
    margin: 0.2em 0;
    text-align: center;
  }
`

interface Props {}

const HeroBookingPrompt: FC<Props> = () => {
  const data = useStaticQuery(graphql`
    query HeroBookingPrompt {
      site {
        siteMetadata {
          seoDescription
          campWeeks {
            week
            shortDates
          }
        }
      }
      copy: markdownRemark(fileAbsolutePath: { regex: "/booking-prompt.md/" }) {
        frontmatter {
          header
        }
        html
      }
    }
  `)
  return (
    <Main>
      <Title>{data.copy.frontmatter.header}</Title>
      <Paragraph
        dangerouslySetInnerHTML={{ __html: data.copy.html }}
      ></Paragraph>
      <Content>
        <BookingNoticeText>
          {data.site.siteMetadata.campWeeks.map((week: any) => {
            return (
              <BookingNoticeRow key={week.week}>
                <BookingNoticeLabel>Week {week.week}</BookingNoticeLabel>
                <span>{week.shortDates}</span>
              </BookingNoticeRow>
            )
          })}
        </BookingNoticeText>
        {ENABLE_BOOKING && <BookButton>Book now</BookButton>}
      </Content>
    </Main>
  )
}

export default HeroBookingPrompt
