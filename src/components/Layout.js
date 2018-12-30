// @flow

import React, { useState, type Node } from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import "normalize.css"

import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Footer from "./Footer"
import PageGutter from "./PageGutter"
import { MOBILE_WIDTH } from "../constants"

const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Content = styled.div`
  position: relative;
  flex-grow: 1;
  z-index: -1;
`

const ContentBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  @media (min-width: ${MOBILE_WIDTH}px) {
    display: none;
  }
`

const HeaderAndHeroContainer = styled.div`
  position: relative;
  color: ${props => (props.theme === "dark" ? "#333" : "white")};
`

const HeaderContainer = styled.div`
  position: ${props => (props.overHero ? "absolute" : "relative")};
  top: 0;
  left: 0;
  right: 0;
`

type Props = {|
  children: Node,
  applyGutter?: boolean,
  title: ?string,
  hero?: ?Node,
  theme?: "light" | "dark",
|}

const Layout = ({
  children,
  applyGutter = true,
  title,
  hero,
  theme,
}: Props) => {
  const [mobileNavMenuExpanded, setMobileNavMenu] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <Main>
          <GlobalStyles />
          <Helmet
            title={
              title != null
                ? `${title} | ${data.site.siteMetadata.title}`
                : data.site.siteMetadata.title
            }
            meta={[
              { name: "description", content: "Sample" },
              { name: "keywords", content: "sample, something" },
            ]}
          >
            <html lang="en" />
            <link
              href="https://fonts.googleapis.com/css?family=Raleway:300,400,700"
              rel="stylesheet"
            />
          </Helmet>
          <HeaderAndHeroContainer theme={theme}>
            {hero != null && (
              <div style={{ position: "relative" }}>
                {hero}
                {mobileNavMenuExpanded && <ContentBlur />}
              </div>
            )}
            <HeaderContainer overHero={hero != null}>
              <Header
                siteTitle={data.site.siteMetadata.title}
                theme={theme}
                menuExpanded={mobileNavMenuExpanded}
                setMenuExpanded={setMobileNavMenu}
                displayShadows={hero != null}
              />
            </HeaderContainer>
          </HeaderAndHeroContainer>
          <Content blurred={mobileNavMenuExpanded}>
            {applyGutter ? (
              <PageGutter>{children}</PageGutter>
            ) : (
              <div>{children}</div>
            )}
            {mobileNavMenuExpanded && <ContentBlur />}
          </Content>
          <Footer />
        </Main>
      )}
    />
  )
}

export default Layout
