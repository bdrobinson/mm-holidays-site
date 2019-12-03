import React, { ReactNode, useState, useEffect, FC } from "react"
import styled from "styled-components"

const Main = styled.div`
  position: relative;
`

const Fader = styled.div<{ first: boolean; visible: boolean }>`
  position: ${props => (props.first ? "relative" : "absolute")};
  top: ${props => (props.first ? "auto" : "0")};
  bottom: ${props => (props.first ? "auto" : "0")};
  left: ${props => (props.first ? "auto" : "0")};
  right: ${props => (props.first ? "auto" : "0")};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53);
`

interface Props {
  renderImage: (fluid: any) => ReactNode
  fluids: Array<any>
}

const useIncrement = () => {
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1)
    }, 3000)
    return () => {
      clearInterval(id)
    }
  }, [])
  return count
}

const ImageCrossfade: FC<Props> = ({ renderImage, fluids }: Props) => {
  const count = useIncrement()
  const option = count % fluids.length
  return (
    <Main>
      {fluids.map((fluid, i) => (
        <Fader key={i} visible={i === option} first={i === 0}>
          {renderImage(fluid)}
        </Fader>
      ))}
    </Main>
  )
}

export default ImageCrossfade
