import React, { FC } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import BookButton from "./BookButton"
import { PRIMARY_COLOUR_LIGHT, PRIMARY_COLOUR_DARK } from "../constants"
import PageGutter from "./PageGutter"

const Main = styled.div`
  text-align: center;
  background-color: ${PRIMARY_COLOUR_DARK};
  color: ${PRIMARY_COLOUR_LIGHT};
`

const Title = styled.h2`
  letter-spacing: 0.7px;
  font-size: 2rem;
  margin-top: 1em;
`

const BookButtonContainer = styled.div`
  text-align: center;
  width: 100%;
  margin: 1em 0;
`

interface Props {}

const FooterBookingPrompt: FC<Props> = () => (
  <Main>
    <PageGutter>
      <Title>Bookings for 2020 are now open!</Title>
      <BookButtonContainer>
        <BookButton fontSize="1.5rem">Book now</BookButton>
      </BookButtonContainer>
      <p>
        Got questions? You can read more about <Link to="/max/">Max</Link>,{" "}
        <Link to="/madness/">Madness</Link> and{" "}
        <Link to="/mayhem/">Mayhem</Link>, or{" "}
        <Link to="/contact/">get in touch</Link> with us.
      </p>
    </PageGutter>
  </Main>
)

export default FooterBookingPrompt
