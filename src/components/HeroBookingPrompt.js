// @flow

import styled from "styled-components"
import React from "react"

import { TINY_WIDTH, GREEN } from "../constants"
import Pill from "./Pill"
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

const PillContainer = styled.div`
  font-size: 0.8em;
  padding-left: 0.8em;
  text-align: center;
  @media (min-width: ${TINY_WIDTH}px) {
    max-width: 5em;
  }
`

const Paragraph = styled.p`
  font-size: 1.2em;
  margin: 0.2em 0;
`

type Props = {||}

const HeroBookingPrompt = (props: Props) => (
  <Main>
    <Title>M+M 1 is now fully booked!</Title>
    <Paragraph>
      But don&apos;t worry as there are still a few places available on
      M+M&nbsp;2. Snap them up before they go!
    </Paragraph>
    <Content>
      <BookingNoticeText>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M 1</BookingNoticeLabel>
          <span>Sat 25 July &ndash; Sat 1 August</span>
        </BookingNoticeRow>
        <BookingNoticeRow>
          <BookingNoticeLabel>M+M 2</BookingNoticeLabel>
          <div css="display: flex; flex-flow: row nowrap; align-items: center;">
            <span>Sat 1 &ndash; Sat 8 August</span>
            <PillContainer>
              <Pill text="Available" bgColour={GREEN} colour="white" />
            </PillContainer>
          </div>
        </BookingNoticeRow>
      </BookingNoticeText>
      <BookButton>Book now</BookButton>
    </Content>
    <Paragraph css="font-size: 1em; font-style: italic;">
      If you can only make the M+M 1 dates,{" "}
      <a href="mailto:info@madnessandmayhem.org.uk">get in contact</a> as there
      may be 1 or 2 spaces in some age groups.
    </Paragraph>
  </Main>
)

export default HeroBookingPrompt
