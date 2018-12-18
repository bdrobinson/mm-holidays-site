// @flow

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import PageGutter from "./PageGutter"
import { MOBILE_WIDTH } from "../constants"

const Main = styled.div`
  color: ${props => (props.theme === "dark" ? "#333" : "white")};
`

const TopBar = styled.header`
  top: 0;
  width: 100%;
  padding-top: 0.5rem;
  background: ${props =>
    props.shadow
      ? "linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,0.1))"
      : "none"};
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
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  overflow-x: auto;
  text-shadow: ${props =>
    props.shadow ? "0 0 30px rgba(0, 0, 0, 0.5)" : "none"};
  @media (max-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`

const MenuButton = styled.button.attrs({ children: "Menu" })`
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  font-weight: 500;
  @media (min-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  margin-left: 0.8em;
  padding: 1em;
  color: currentColor;
  font-weight: bold;
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
  theme?: "light" | "dark",
  menuExpanded: boolean,
  setMenuExpanded: boolean => void,
  displayShadows: boolean,
|}

const Header = ({
  siteTitle,
  theme = "dark",
  menuExpanded,
  setMenuExpanded,
  displayShadows,
}: Props) => {
  return (
    <Main theme={theme}>
      <TopBar shadow={displayShadows}>
        <PageGutter>
          <Inner>
            <Link to="/">
              <LogoContainer>
                <StaticQuery
                  query={graphql`
                    query {
                      light: file(relativePath: { eq: "logo_white.png" }) {
                        childImageSharp {
                          fluid(maxWidth: 150, traceSVG: { color: "white" }) {
                            ...GatsbyImageSharpFluid_tracedSVG
                          }
                        }
                      }
                      dark: file(relativePath: { eq: "logo_black.png" }) {
                        childImageSharp {
                          fluid(maxWidth: 150, traceSVG: { color: "black" }) {
                            ...GatsbyImageSharpFluid_tracedSVG
                          }
                        }
                      }
                    }
                  `}
                  render={data => {
                    const image =
                      theme === "light"
                        ? data.light.childImageSharp.fluid
                        : data.dark.childImageSharp.fluid
                    return <Img fluid={image} />
                  }}
                />
              </LogoContainer>
            </Link>
            <Nav shadows={displayShadows}>
              <NavLink to="/about">About us</NavLink>
              <NavLink to="/max">Max</NavLink>
              <NavLink to="/madness">Madness</NavLink>
              <NavLink to="/mayhem">Mayhem</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </Nav>
            <MenuButton
              onClick={() => {
                setMenuExpanded(!menuExpanded)
              }}
            />
          </Inner>
        </PageGutter>
      </TopBar>
    </Main>
  )
}

export default Header
