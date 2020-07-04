import React from "react"
import { graphql, useStaticQuery } from "gatsby"

interface Props {
  children: React.ReactNode
  padding: string | number
}

const OnlineTextbox = ({ children, padding }: Props) => {
  const data = useStaticQuery(graphql`
    query OnlineTextboxQuery {
      onlineTextbox: file(absolutePath: { regex: "/online_textbox.png$/" }) {
        childImageSharp {
          fixed(width: 800) {
            src
          }
        }
      }
    }
  `)
  return (
    <div
      css={`
        position: relative;
      `}
      style={{ padding }}
    >
      <img
        css={`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        `}
        src={data.onlineTextbox.childImageSharp.fixed.src}
        aria-hidden={true}
      />
      <div css="position: relative;">{children}</div>
    </div>
  )
}

export default OnlineTextbox
