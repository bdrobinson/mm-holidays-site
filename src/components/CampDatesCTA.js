// @flow

import React from "react"
import styled from "styled-components"

import BookButton from "./BookButton"
import { MOBILE_WIDTH } from "../constants"

const HeroDetailsContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${MOBILE_WIDTH}px) {
    flex-flow: column nowrap;
    text-align: center;
  }
`

const HeroDetailsRow = styled.p`
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: 600;
  text-shadow: ${props =>
    props.shadows ? "0 0 30px rgba(0, 0, 0, 0.5)" : "none"};
`

const BookButtonContainer = styled.div`
  font-size: 0.8em;
  @media (max-width: ${MOBILE_WIDTH}px) {
    margin-top: 0.8em;
  }
`

type Props = {|
  campName: string,
  shadows: boolean,
|}

const CampDatesCTA = ({ campName, shadows }: Props) => (
  <HeroDetailsContent>
    <div>
      <HeroDetailsRow shadows={shadows}>
        {campName} 1: 26
        <sup>th</sup> July &ndash; 3<sup>rd</sup> August 2019
      </HeroDetailsRow>
      <HeroDetailsRow shadows={shadows}>
        {campName} 2: 3<sup>rd</sup> &ndash; 10
        <sup>th</sup> August 2019
      </HeroDetailsRow>
    </div>
    <BookButtonContainer>
      <BookButton>Book now</BookButton>
    </BookButtonContainer>
  </HeroDetailsContent>
)

export default CampDatesCTA
