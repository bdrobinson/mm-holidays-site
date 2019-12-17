import React, { FC } from "react"
import styled from "styled-components"

import BookButton from "./BookButton"
import { MOBILE_WIDTH, ENABLE_BOOKING } from "../constants"

const HeroDetailsContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`

const HeroDetailsRow = styled.div<{ shadows: boolean }>`
  margin: 0.4em 0;
  padding: 0;
  font-size: inherit;
  font-weight: 600;
  text-shadow: ${props =>
    props.shadows ? "0 0 30px rgba(0, 0, 0, 0.5)" : "none"};
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  justify-content: space-between;
`

const BookButtonContainer = styled.div`
  font-size: 0.8em;
`

const CampName = styled.div`
  margin-right: 1em;
  text-transform: uppercase;
  font-size: 0.7em;
  opacity: 0.9;
  letter-spacing: 0.1em;
  flex: 0 0 auto;
`

const CampDate = styled.div`
  text-align: right;
  @media (max-width: ${MOBILE_WIDTH}px) {
    font-size: 0.9em;
  }
`

const PriceText = styled.div`
  font-size: 0.8em;
  font-weight: 500;
`

interface Props {
  campName: string
  shadows: boolean
  price: string
}

const CampDatesCTA: FC<Props> = ({ campName, shadows, price }: Props) => (
  <HeroDetailsContent>
    <div>
      <HeroDetailsRow shadows={shadows}>
        <CampName>{campName} 1:</CampName>
        <CampDate>25 July &ndash; 1 August 2020</CampDate>
      </HeroDetailsRow>
      <HeroDetailsRow shadows={shadows}>
        <CampName>{campName} 2:</CampName>
        <CampDate>1 &ndash; 8 August 2020</CampDate>
      </HeroDetailsRow>
    </div>
    <div
      aria-hidden={true}
      css={`
        background-color: currentColor;
        width: 0.15em;
        margin: 0 1.5em;
        align-self: stretch;
        border-radius: 0.1em;
      `}
    />
    {ENABLE_BOOKING && (
      <BookButtonContainer>
        <BookButton paddingHorizontal="0.3em">
          <div>Book now</div>
          <PriceText>{price}</PriceText>
        </BookButton>
      </BookButtonContainer>
    )}
  </HeroDetailsContent>
)

export default CampDatesCTA
