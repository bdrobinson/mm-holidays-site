// @flow

import styled from "styled-components"
import React from "react"

import { TINY_WIDTH } from "../constants"
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

const BookingNoticeText = styled.p`
  flex-grow: 1;
  flex-shrink: 1;
  padding-right: 1em;
  margin: 0;
  font-size: 1em;
`

const BookingNoticeRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0.4em 0;
  font-size: 1.2em;
  @media (max-width: ${TINY_WIDTH}px) {
    flex-flow: column nowrap;
  }
`

const BookingNoticeLabel = styled.span`
  font-weight: bold;
  margin-right: 0.8em;
`

type Props = {||}

const HeroBookingPrompt = (props: Props) => (
  <Main>
    <Title>Bookings for 2019 are now open!</Title>
    <Content>
      <BookingNoticeText>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M 1</BookingNoticeLabel>
          <span>
            Sat 27
            <sup>th</sup> July &ndash; Sat 3<sup>rd</sup> August
          </span>
        </BookingNoticeRow>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M 2</BookingNoticeLabel>
          <span>
            Sat 3<sup>rd</sup> &ndash; Sat 10
            <sup>th</sup> August
          </span>
        </BookingNoticeRow>
      </BookingNoticeText>
      <BookButton>Book now</BookButton>
    </Content>
  </Main>
)

export default HeroBookingPrompt
