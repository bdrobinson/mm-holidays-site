import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "gatsby-link"

import PageGutter from "./PageGutter"
import {
  FOOTER_BG,
  FOOTER_TEXT,
  MOBILE_WIDTH,
  ENABLE_BOOKING,
} from "../constants"

const links: Array<{ name: string; path: string }> = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
  { name: "About us", path: "/about" },
  { name: "Max", path: "/max" },
  { name: "Madness", path: "/madness" },
  { name: "Mayhem", path: "/mayhem" },
  { name: "Get Involved", path: "/get_involved" },
  ...(ENABLE_BOOKING
    ? [
        { name: "Book", path: "/booking" },
        { name: "Booking T&Cs", path: "/terms-and-conditions" },
      ]
    : []),
]

interface Props {}

const Footer: FC<Props> = () => {
  const data = useStaticQuery(
    graphql`
      query Footer {
        site {
          buildTime
        }
        logo: file(relativePath: { eq: "logo_black.png" }) {
          childImageSharp {
            fluid(maxWidth: 150, traceSVG: { color: "black" }) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `,
  )
  return (
    <footer
      css={`
        background-color: ${FOOTER_BG};
        color: ${FOOTER_TEXT};
        padding: 2rem 0;
        text-align: left;
        & a {
          color: currentColor;
        }
      `}
    >
      <PageGutter>
        <div
          css={`
            display: grid;
            grid-template-columns: auto auto auto 1fr;
            grid-gap: 1em;
            grid-template-areas: "logo email bar links";
            @media (max-width: ${MOBILE_WIDTH}px) {
              grid-template-columns: auto 1fr;
              grid-template-areas:
                "logo email"
                "links links";
            }
            align-items: center;
          `}
        >
          <Link
            to="/"
            css={`
              grid-area: logo;
              display: block;
              width: 6em;
              height: auto;
              opacity: 0.6;
            `}
          >
            <Img fluid={data.logo.childImageSharp.fluid} alt="The M+M logo" />
          </Link>
          <div
            css={`
              grid-area: email;
            `}
          >
            <p
              css={`
                display: block;
                font-weight: 700;
                margin: 0;
              `}
            >
              M+M Holidays
            </p>
            <a href="mailto:info@madnessandmayhem.org.uk">
              info@madnessandmayhem.org.uk
            </a>
          </div>
          <div
            aria-hidden={true}
            css={`
              grid-area: bar;
              width: 3px;
              border-radius: 6px;
              background-color: currentColor;
              align-self: stretch;
              margin: 1em;
              @media (max-width: ${MOBILE_WIDTH}px) {
                display: none;
              }
            `}
          />
          <div
            css={`
              grid-area: links;
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
              grid-gap: 1em;
              align-items: center;
            `}
          >
            {links.map(l => (
              <div key={l.path}>
                <Link to={l.path}>{l.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div css="text-align: center; margin-top: 2em;">
          &copy; M+M Holidays {new Date(data.site.buildTime).getFullYear()}
        </div>
      </PageGutter>
    </footer>
  )
}

export default Footer
