import React from "react"

import Stack from "./Stack"

interface Props {
  title: string
  age: string
  videos: Array<{
    weekday: string
    url: string
  }>
}

const CampVideos: React.FC<Props> = ({ title, videos, age }: Props) => {
  return (
    <div
      css={`
        text-align: center;
      `}
    >
      <Stack padding="0.3em">
        <div>
          <div css="font-size: 2rem; font-family: Changa One;">{title}</div>
          <div css="font-size: 1.5rem; font-weight: 700;">Age {age}</div>
        </div>
        <ul
          css={`
            font-size: 1.5rem;
            list-style-type: none;
            padding-inline-start: 0;
            margin: 0;
          `}
        >
          <Stack padding="0.4em">
            {videos.map(({ url, weekday }) => {
              return (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {weekday}
                  </a>
                </li>
              )
            })}
          </Stack>
        </ul>
      </Stack>
    </div>
  )
}

export default CampVideos
