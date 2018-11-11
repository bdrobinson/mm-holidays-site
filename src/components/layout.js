// @flow

import React, { type Node } from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import "normalize.css"

import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import Footer from "./Footer"
import PageGutter from "./PageGutter"

type Props = {|
  children: Node,
  applyGutter?: boolean,
  title: ?string,
|}

const Layout = ({ children, applyGutter = true, title }: Props) => (
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
      <>
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
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        {applyGutter ? (
          <PageGutter>{children}</PageGutter>
        ) : (
          <div>{children}</div>
        )}
        <Footer />
      </>
    )}
  />
)

export default Layout
