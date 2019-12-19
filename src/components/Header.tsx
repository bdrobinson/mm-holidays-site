import React, { FC } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import PageGutter from "./PageGutter"
import {
  MOBILE_WIDTH,
  PRIMARY_COLOUR_DARK,
  Z_INDICES,
  ENABLE_BOOKING,
} from "../constants"

const LOGO_ASPECT_RATIO = 1.076
const LOGO_WIDTH_DESKTOP = 150
const LOGO_WIDTH_MOBILE = 100
const LOGO_HEIGHT_DESKTOP = LOGO_WIDTH_DESKTOP / LOGO_ASPECT_RATIO
const LOGO_HEIGHT_MOBILE = LOGO_WIDTH_MOBILE / LOGO_ASPECT_RATIO

const LINKS: Array<{ link: string; label: string; accent?: boolean }> = [
  { link: "/about", label: "About us" },
  { link: "/max", label: "Max" },
  { link: "/madness", label: "Madness" },
  { link: "/mayhem", label: "Mayhem" },
  { link: "/get_involved", label: "Get involved" },
  { link: "/contact", label: "Contact" },
  ...(ENABLE_BOOKING
    ? [{ link: "/booking", label: "Book", accent: true }]
    : []),
]

const Main = styled.div`
  position: relative;
  color: ${props => (props.theme === "dark" ? PRIMARY_COLOUR_DARK : "white")};
  z-index: ${Z_INDICES.nav}; /* urghh */
`

const TopBar = styled.header<{ shadow: boolean }>`
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
  overflow-x: visible;
  position: relative;
`

const Nav = styled.nav<{ shadow: boolean }>`
  flex-shrink: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  overflow-x: visible;
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
  padding: 1em 0.6em;
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

const AccentNavLink = styled(NavLink)`
  background-color: white;
  color: #333;
  padding: 0.7em 1em;
  border-radius: 1.3em;
  text-shadow: none;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  margin-left: 1.2em;
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

interface Props {
  theme?: "light" | "dark" | null
  menuExpanded: boolean
  setMenuExpanded: (expanded: boolean) => void
  displayShadows: boolean
}

const Header: FC<Props> = ({
  theme: themeOpt,
  menuExpanded,
  setMenuExpanded,
  displayShadows,
}: Props) => {
  const theme = themeOpt ?? "dark"

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
                    return <Img fluid={image} alt="The M+M logo" />
                  }}
                />
              </LogoContainer>
            </Link>
            <Nav shadow={displayShadows}>
              {LINKS.map(({ link, label, accent }) => {
                if (accent === true) {
                  return (
                    <AccentNavLink key={link} to={link}>
                      {label}
                    </AccentNavLink>
                  )
                }
                return (
                  <NavLink key={link} to={link}>
                    {label}
                  </NavLink>
                )
              })}
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
