// @flow

import React from "react"
import styled from "styled-components"
import { graphql, StaticQuery, Link } from "gatsby"

import PageGutter from "./PageGutter"
import { FOOTER_BG, FOOTER_TEXT } from "../constants"

const FooterMain = styled.footer`
  background-color: ${FOOTER_BG};
  color: ${FOOTER_TEXT};
  padding: 2rem 0;
  text-align: center;
`

const Footer = () => (
  <FooterMain>
    <PageGutter>
      <h2>M+M Holidays</h2>
      <span>&copy; M+M Holidays 2018</span>
      <StaticQuery
        query={graphql`
          {
            allMarkdownRemark(filter: { frontmatter: { path: { ne: null } } }) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                  }
                }
              }
            }
          }
        `}
        render={data => {
          return data.allMarkdownRemark.edges.map(edge => {
            const { path, title } = edge.node.frontmatter
            return (
              <Link to={`${path}`} key={path}>
                {title}
              </Link>
            )
          })
        }}
      />
    </PageGutter>
  </FooterMain>
)

export default Footer
