// @flow

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import PageGutter from "./PageGutter"

const Main = styled.header`
  margin-bottom: 1.45rem;
  margin-top: 0.5rem;
`

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
`

const Nav = styled.nav`
  flex-shrink: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  overflow-x: auto;
`

const NavLink = styled(Link)`
  margin-left: 0.8em;
  padding: 1em;
  color: currentColor;
  text-decoration: none;
  text-align: center;
  flex-shrink: 1;
  flex-grow: 0;
  @media (hover: hover), (-moz-touch-enabled: 0) {
    &:hover {
      text-decoration: underline;
    }
  }
`

const LogoContainer = styled.div`
  width: 150px;
  @media (max-width: 800px) {
    width: 100px;
  }
`

type Props = {|
  siteTitle: string,
|}

const Header = ({ siteTitle }: Props) => (
  <Main>
    <PageGutter>
      <Inner>
        <Link to="/">
          <LogoContainer>
            <StaticQuery
              query={graphql`
                query {
                  placeholderImage: file(relativePath: { eq: "logo.jpg" }) {
                    childImageSharp {
                      fluid(maxWidth: 150) {
                        ...GatsbyImageSharpFluid_tracedSVG
                      }
                    }
                  }
                }
              `}
              render={data => {
                return (
                  <Img fluid={data.placeholderImage.childImageSharp.fluid} />
                )
              }}
            />
          </LogoContainer>
        </Link>
        <Nav>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/max">Max</NavLink>
          <NavLink to="/madness">Madness</NavLink>
          <NavLink to="/mayhem">Mayhem</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Nav>
      </Inner>
    </PageGutter>
  </Main>
)

export default Header
