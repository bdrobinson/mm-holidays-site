// @flow

import React, { type Node } from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import "normalize.css"

import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Footer from "./Footer"
import PageGutter from "./PageGutter"

const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex-grow: 1;
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
}: Props) => (
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
        <Header
          siteTitle={data.site.siteMetadata.title}
          hero={hero}
          theme={theme}
        />
        <Content>
          {applyGutter ? (
            <PageGutter>{children}</PageGutter>
          ) : (
            <div>{children}</div>
          )}
        </Content>
        <Footer />
      </Main>
    )}
  />
)

export default Layout
