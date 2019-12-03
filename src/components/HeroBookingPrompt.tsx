import styled from "styled-components"
import React, { FC } from "react"

import { TINY_WIDTH, ENABLE_BOOKING } from "../constants"
import BookButton from "./BookButton"

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
  padding-right: 1em;
  margin: 0;
  font-size: 1em;
`

const BookingNoticeRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0.8em 0;
  font-size: 1.2em;
  @media (max-width: ${TINY_WIDTH}px) {
    flex-flow: column nowrap;
  }
  align-items: center;
`

const BookingNoticeLabel = styled.span`
  font-weight: bold;
  margin-right: 0.8em;
`

// const PillContainer = styled.div`
//   font-size: 0.8em;
//   padding-left: 0.8em;
//   text-align: center;
//   @media (min-width: ${TINY_WIDTH}px) {
//     max-width: 5em;
//   }
// `

const Paragraph = styled.p`
  font-size: 1.2em;
  margin: 0.2em 0;
`

interface Props {}

const HeroBookingPrompt: FC<Props> = () => (
  <Main>
    <Title>Save the dates for 2020!</Title>
    <Paragraph>
      M+M will return to the Frontier Centre in 2020. Block it out in your
      calendar now!
    </Paragraph>
    <Content>
      <BookingNoticeText>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M 1</BookingNoticeLabel>
          <span>Sat 25 July &ndash; Sat 1 August 2020</span>
        </BookingNoticeRow>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M 2</BookingNoticeLabel>
          <span>Sat 1 &ndash; Sat 8 August 2020</span>
        </BookingNoticeRow>
      </BookingNoticeText>
      {ENABLE_BOOKING && <BookButton>Book now</BookButton>}
    </Content>
  </Main>
)

export default HeroBookingPrompt
