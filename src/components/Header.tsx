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
  SMALLSCREEN_WIDTH,
} from "../constants"

const LINKS: Array<{
  link: string
  label: string
  sublabel?: string
  accent?: boolean
}> = [
  { link: "/about", label: "About us" },
  { link: "/max", label: "Max", sublabel: "9-11" },
  { link: "/madness", label: "Madness", sublabel: "12-14" },
  { link: "/mayhem", label: "Mayhem", sublabel: "15-18" },
  { link: "/get-involved", label: "Get involved" },
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

// @ts-ignore
const NavLink = styled(Link)`
  display: block;
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
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    margin-left: 0;
    padding: 1em 0.7em;
  }
`

const AccentNavLink = styled(NavLink)<{ light: boolean }>`
  background-color: ${props => (props.light ? "white" : "#333")};
  color: ${props => (props.light ? "#333" : "white")};
  padding: 0.8em 1.1em !important;
  margin-left: 0.8em !important;
  border-radius: 1.3em;
  text-shadow: none;
  margin-left: 1.2em;
`

const MobileNavMenu = styled.div`
  background-color: white;
  position: absolute;
  width: 100%;
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

// @ts-ignore
const MobileNavLink = styled(Link)`
  display: block;
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
    <Main
      theme={themeToUse}
      style={{ backgroundColor: menuExpanded ? "white" : undefined }}
    >
      <TopBar shadow={menuExpanded ? false : displayShadows}>
        <PageGutter>
          <div
            css={`
              width: 100%;
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              justify-content: space-between;
              overflow-x: visible;
              position: relative;
            `}
          >
            <Link to="/">
              <div
                css={`
                  width: 130px;
                  padding: 10px 0;
                  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
                    width: 80px;
                  }
                `}
              >
                <StaticQuery
                  query={graphql`
                    query {
                      light: file(relativePath: { eq: "logo_white.png" }) {
                        childImageSharp {
                          fluid(maxWidth: 130, traceSVG: { color: "white" }) {
                            ...GatsbyImageSharpFluid_tracedSVG
                          }
                        }
                      }
                      dark: file(relativePath: { eq: "logo_black.png" }) {
                        childImageSharp {
                          fluid(maxWidth: 130, traceSVG: { color: "black" }) {
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
              </div>
            </Link>
            <Nav shadow={displayShadows}>
              {LINKS.map(({ link, label, accent, sublabel }) => {
                if (accent === true) {
                  return (
                    <AccentNavLink
                      key={link}
                      to={link}
                      light={theme === "light"}
                    >
                      {label}
                    </AccentNavLink>
                  )
                }
                return (
                  <NavLink key={link} to={link}>
                    <div
                      css={`
                        position: relative;
                      `}
                    >
                      {label}
                      {sublabel !== undefined && (
                        <div
                          css={`
                            text-decoration: inherit;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            text-align: center;
                            transform: translateY(100%);
                            position: absolute;
                            font-size: 0.8em;
                            font-weight: 500;
                          `}
                        >
                          {sublabel}
                        </div>
                      )}
                    </div>
                  </NavLink>
                )
              })}
            </Nav>
            <MenuButton
              onClick={() => {
                setMenuExpanded(!menuExpanded)
              }}
            />
          </div>
        </PageGutter>
      </TopBar>
      <div>
        {menuExpanded && (
          <MobileNavMenu>
            <PageGutter>
              <MobileNavLinksContainer>
                {LINKS.map(({ link, label, sublabel }) => (
                  <MobileNavLink key={link} to={link}>
                    {label}
                    {sublabel !== undefined && (
                      <div
                        css={`
                          font-size: 0.7em;
                        `}
                      >
                        Age {sublabel}
                      </div>
                    )}
                  </MobileNavLink>
                ))}
              </MobileNavLinksContainer>
            </PageGutter>
          </MobileNavMenu>
        )}
      </div>
    </Main>
  )
}

export default Header
