// @flow

import React from "react"

type Props = {|
  colour: string,
  bgColour: string,
  text: string,
|}

const Pill = ({ text, colour, bgColour }: Props) => {
  return (
    <div
      css="padding: 0.4em; border-radius: 0.2em; display: flex; justify-content: center;"
      style={{ backgroundColor: bgColour, color: colour }}
    >
      <div>{text}</div>
    </div>
  )
}

export default Pill
