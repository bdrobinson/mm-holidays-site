// @flow

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import PageGutter from "./PageGutter"
import { MOBILE_WIDTH, PRIMARY_COLOUR_DARK, Z_INDICES } from "../constants"

const LOGO_ASPECT_RATIO = 1.076
const LOGO_WIDTH_DESKTOP = 150
const LOGO_WIDTH_MOBILE = 100
const LOGO_HEIGHT_DESKTOP = LOGO_WIDTH_DESKTOP / LOGO_ASPECT_RATIO
const LOGO_HEIGHT_MOBILE = LOGO_WIDTH_MOBILE / LOGO_ASPECT_RATIO

const LINKS: Array<{ link: string, label: string }> = [
  { link: "/about", label: "About us" },
  { link: "/max", label: "Max" },
  { link: "/madness", label: "Madness" },
  { link: "/mayhem", label: "Mayhem" },
  { link: "/contact", label: "Contact" },
]

const Main = styled.div`
  position: relative;
  color: ${props => (props.theme === "dark" ? PRIMARY_COLOUR_DARK : "white")};
  z-index: ${Z_INDICES.nav}; /* urghh */
`

const TopBar = styled.header`
  top: 0;
  width: 100%;
  padding-top: 0.5rem;
  background: ${props =>
    props.shadow
      ? "linear-gradient(to top,rgba(0,0,0,0),rgba(0,0,0,0.2))"
      : "none"};
`

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  position: relative;
`

const Nav = styled.nav`
  flex-shrink: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  overflow-x: auto;
  text-shadow: ${props =>
    props.shadow ? "0 0 8px rgba(0, 0, 0, 0.3)" : "none"};
  @media (max-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`

const MenuButton = styled.button.attrs({ children: "Menu" })`
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
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

const MobileNavMenu = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-top: ${LOGO_HEIGHT_DESKTOP}px;
  @media (max-width: ${MOBILE_WIDTH}px) {
    padding-top: ${LOGO_HEIGHT_MOBILE}px;
  }
  @media (min-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`

const MobileNavLinksContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  padding: 1em 0;
`

const MobileNavLink = styled(Link)`
  flex-grow: 0;
  flex-shrink: 0;
  text-align: center;
  font-size: 2em;
  padding: 0.5em;
  text-decoration: none;
  @media (hover: hover), (-moz-touch-enabled: 0) {
    &:hover {
      text-decoration: underline;
    }
  }
`

type Props = {|
  theme?: "light" | "dark",
  menuExpanded: boolean,
  setMenuExpanded: boolean => void,
  displayShadows: boolean,
|}

const Header = ({
  theme = "dark",
  menuExpanded,
  setMenuExpanded,
  displayShadows,
}: Props) => {
  const themeToUse = menuExpanded ? "dark" : theme
  return (
    <Main theme={themeToUse}>
      {menuExpanded && (
        <MobileNavMenu>
          <PageGutter>
            <MobileNavLinksContainer>
              {LINKS.map(({ link, label }) => (
                <MobileNavLink key={link} to={link}>
                  {label}
                </MobileNavLink>
              ))}
            </MobileNavLinksContainer>
          </PageGutter>
        </MobileNavMenu>
      )}
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
                      themeToUse === "light"
                        ? data.light.childImageSharp.fluid
                        : data.dark.childImageSharp.fluid
                    return <Img fluid={image} />
                  }}
                />
              </LogoContainer>
            </Link>
            <Nav shadow={displayShadows}>
              {LINKS.map(({ link, label }) => (
                <NavLink key={link} to={link}>
                  {label}
                </NavLink>
              ))}
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
