// @flow

import styled from "styled-components"
import React from "react"

import { TINY_WIDTH } from "../constants"

const Main = styled.div`
  background-color: white;
  overflow: auto;
  padding: 1.8em;
  color: #333;
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

const BookingNoticeLink = styled.a`
  padding: 1em;
  background-color: #74c3ed;
  border-radius: 3em;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  min-width: 6em;
  color: #203641;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 400ms, color 400ms;
  font-size: 1.2em;
  &:hover {
    background-color: #c4e6f7;
  }
`

const BookingNoticeRow = styled.p`
  margin: 0.4em 0;
  font-size: 1.2em;
`

const BookingNoticeLabel = styled.span`
  font-weight: bold;
  margin-right: 0.8em;
`

const OptionalLineBreak = styled.span.attrs({ children: <br /> })`
  @media (min-width: ${TINY_WIDTH}px) {
    display: none;
  }
`

type Props = {||}

const HeroBookingPrompt = (props: Props) => (
  <Main>
    <Title>Bookings for 2019 are now open!</Title>
    <Content>
      <BookingNoticeText>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M week 1</BookingNoticeLabel>
          <OptionalLineBreak />
          <span>
            Sat 27
            <sup>th</sup> July &ndash; Sat 3<sup>rd</sup> August
          </span>
        </BookingNoticeRow>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M week 2</BookingNoticeLabel>
          <OptionalLineBreak />
          <span>
            Sat 3<sup>rd</sup> &ndash; Sat 10
            <sup>th</sup> August
          </span>
        </BookingNoticeRow>
      </BookingNoticeText>
      <BookingNoticeLink href="https://google.com">Book now</BookingNoticeLink>
    </Content>
  </Main>
)

export default HeroBookingPrompt
