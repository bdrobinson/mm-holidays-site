// @flow

import React from "react"
import styled from "styled-components"
import { graphql, StaticQuery, Link } from "gatsby"

import PageGutter from "./PageGutter"

const FooterMain = styled.footer`
  margin-bottom: 1rem;
  margin-top: 2rem;
`

const Footer = () => (
  <FooterMain>
    <PageGutter>
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
            return <Link to={`${path}`}>{title}</Link>
          })
        }}
      />
    </PageGutter>
  </FooterMain>
)

export default Footer
