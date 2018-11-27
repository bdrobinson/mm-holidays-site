// @flow

import React, { type Node } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import PageGutter from "./PageGutter"

const Main = styled.div`
  position: relative;
  color: ${props => (props.theme === "dark" ? "#333" : "white")};
`

const TopBar = styled.header`
  position: ${props => (props.drawUnder ? "absolute" : "relative")};
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
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  overflow-x: auto;
  text-shadow: ${props =>
    props.shadow ? "0 0 30px rgba(0, 0, 0, 0.5)" : "none"};
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
  hero?: ?Node,
  theme?: "light" | "dark",
|}

const Header = ({ siteTitle, hero, theme = "dark" }: Props) => (
  <Main theme={theme}>
    {hero != null && hero}
    <TopBar drawUnder={hero != null} shadow={hero != null}>
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
          <Nav shadows={hero != null}>
            <NavLink to="/about">About us</NavLink>
            <NavLink to="/max">Max</NavLink>
            <NavLink to="/madness">Madness</NavLink>
            <NavLink to="/mayhem">Mayhem</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </Nav>
        </Inner>
      </PageGutter>
    </TopBar>
  </Main>
)

export default Header
