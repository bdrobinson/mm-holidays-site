import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Main = styled.div`
  background-color: palevioletred;
  margin-bottom: 1.45rem;
`

const Inner = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Header = ({ siteTitle }) => (
  <Main>
    <Inner>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </Inner>
  </Main>
)

export default Header
