import React, { useState, ReactNode, FC } from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import "normalize.css"

import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Footer from "./Footer"
import PageGutter from "./PageGutter"
import { MOBILE_WIDTH, Z_INDICES } from "../constants"

const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden; /* hack for mobile safari, needs to be fixed*/
`

const Content = styled.div`
  position: relative;
  flex-grow: 1;
`

const ContentBlur = styled.div`
  position: fixed;
  z-index: ${Z_INDICES.blur};
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

const HeaderContainer = styled.div<{ overHero: boolean }>`
  position: ${props => (props.overHero ? "absolute" : "relative")};
  top: 0;
  left: 0;
  right: 0;
`

interface Props {
  children: ReactNode
  applyGutter?: boolean
  title: string | null
  hero?: ReactNode
  theme?: "light" | "dark" | null
  seoDescription: string | null
  path: string | null
  showNav?: boolean
}

const Layout: FC<Props> = ({
  children,
  applyGutter = true,
  title,
  hero,
  theme,
  seoDescription,
  path,
  showNav = true,
}: Props) => {
  const [mobileNavMenuExpanded, setMobileNavMenu] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              seoDescription
              baseUrl
            }
          }
          defaultImage: file(relativePath: { eq: "hero0.jpg" }) {
            childImageSharp {
              fixed(width: 1200) {
                src
              }
            }
          }
        }
      `}
      render={data => {
        const pageTitle =
          title !== null
            ? `${title} | ${data.site.siteMetadata.title}`
            : data.site.siteMetadata.title
        const pageDescription =
          seoDescription !== null
            ? seoDescription
            : data.site.siteMetadata.seoDescription

        const pageImage = `${data.site.siteMetadata.baseUrl}${data.defaultImage.childImageSharp.fixed.src}`
        const imageAlt = "The M+M Online Logo"
        const pageUrl =
          path !== null ? `${data.site.siteMetadata.baseUrl}${path}` : null
        return (
          <Main>
            {mobileNavMenuExpanded && <ContentBlur />}
            <GlobalStyles />
            <Helmet>
              <html lang="en" />
              <title>{pageTitle}</title>
              <link
                href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Changa+One&display=swap"
                rel="stylesheet"
              ></link>
              <meta
                name="google-site-verification"
                content="0-r7dUs6bAexlQp3Uu5PN6SCyCqWpOdyuoABMYSkk8k"
              />
              <meta name="description" content={pageDescription} />

              <meta property="og:title" content={pageTitle} />
              <meta property="og:type" content="website" />
              <meta property="og:description" content={pageDescription} />
              <meta property="og:image" content={pageImage} />
              {pageUrl !== null && <meta property="og:url" content={pageUrl} />}

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@madnesandmayhem" />
              <meta name="twitter:creator" content="@madnesandmayhem" />
              <meta name="twitter:title" content={pageTitle} />
              <meta name="twitter:description" content={pageDescription} />
              <meta name="twitter:image" content={pageImage} />
              <meta name="twitter:image:alt" content={imageAlt} />
              <meta name="og:image:alt" content={imageAlt} />
            </Helmet>
            <HeaderAndHeroContainer theme={theme}>
              {hero != null && hero}
              {showNav && (
                <HeaderContainer overHero={hero != null}>
                  <Header
                    theme={theme}
                    menuExpanded={mobileNavMenuExpanded}
                    setMenuExpanded={setMobileNavMenu}
                    displayShadows={hero != null}
                  />
                </HeaderContainer>
              )}
            </HeaderAndHeroContainer>
            <Content>
              {applyGutter ? (
                <PageGutter>{children}</PageGutter>
              ) : (
                <div>{children}</div>
              )}
            </Content>
            <Footer />
          </Main>
        )
      }}
    />
  )
}

export default Layout
