// @flow

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import PageGutter from "./PageGutter"

const Main = styled.header`
  margin-bottom: 1.45rem;
`

const Inner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`

const NavLink = styled(Link)`
  font-family: sans-serif;
  margin-left: 0.8em;
`

// const Logo = styled.img.attrs({ src: logo })`
//   width: 10rem;
// `

type Props = {|
  siteTitle: string,
|}

const Header = ({ siteTitle }: Props) => (
  <Main>
    <PageGutter>
      <Inner>
        <h1 style={{ margin: 0 }}>
          <Link to="/">
            <StaticQuery
              query={graphql`
                query {
                  placeholderImage: file(relativePath: { eq: "logo.jpg" }) {
                    childImageSharp {
                      fixed(width: 250) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
              `}
              render={data => {
                return (
                  <Img fixed={data.placeholderImage.childImageSharp.fixed} />
                )
              }}
            />
          </Link>
        </h1>
        <nav>
          <NavLink to="/about">About</NavLink>
        </nav>
      </Inner>
    </PageGutter>
  </Main>
)

export default Header
