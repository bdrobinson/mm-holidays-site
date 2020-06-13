import React from "react"

interface Props {
  padding: string | number
  children: React.ReactNode
}

const Stack: React.FC<Props> = ({ padding, children }) => {
  return (
    <>
      {React.Children.map(children, (child, i) => {
        return (
          <>
            {i !== 0 && <div style={{ height: padding }} aria-hidden={true} />}
            {child}
          </>
        )
      })}
    </>
  )
}

export default Stack
