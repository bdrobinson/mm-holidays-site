import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const random = (min: number, max: number) => {
  const scale = max - min
  return Math.random() * scale + min
}

const clamp = (value: number, min: number, max: number) => {
  if (value > max) {
    return max
  }
  if (value < min) {
    return min
  }
  return value
}

const ImgContainer = styled.div`
  width: 20%;
  position: absolute;
`

const WIGGLE_INTERVAL = 200
const MAX_ROTATION_DEGREES = 30
const ROTATION_STEP_SIZE_DEGREES = 10

const updateValue = (args: {
  current: number
  stepMagnitude: number
  maxMagnitude: number
  offset: number
}): number => {
  const { current, stepMagnitude, maxMagnitude, offset } = args
  const diff = random(-stepMagnitude, stepMagnitude)
  return clamp(current + diff, offset - maxMagnitude, offset + maxMagnitude)
}

const useWiggle = (initialDegrees: number) => {
  const elementRef = useRef<HTMLElement>()
  let currentRotationDegRef = useRef(initialDegrees)
  let currentTranslateXPercentRef = useRef(0)
  let currentTranslateYPercentRef = useRef(0)
  useEffect(() => {
    const element = elementRef.current
    if (element === undefined) {
      return
    }
    const id = setInterval(() => {
      currentRotationDegRef.current = updateValue({
        current: currentRotationDegRef.current,
        stepMagnitude: ROTATION_STEP_SIZE_DEGREES,
        maxMagnitude: MAX_ROTATION_DEGREES,
        offset: initialDegrees,
      })
      currentTranslateXPercentRef.current = updateValue({
        current: currentTranslateXPercentRef.current,
        stepMagnitude: 3,
        maxMagnitude: 10,
        offset: 0,
      })
      currentTranslateYPercentRef.current = updateValue({
        current: currentTranslateYPercentRef.current,
        stepMagnitude: 3,
        maxMagnitude: 10,
        offset: 0,
      })
      const rot = currentRotationDegRef.current
      const tx = currentTranslateXPercentRef.current
      const ty = currentTranslateYPercentRef.current
      element.style.transform = `translateX(${tx}%) translateY(${ty}%) rotateZ(${rot}deg)`
    }, WIGGLE_INTERVAL)
    return () => {
      clearInterval(id)
    }
  })

  return elementRef
}

const colour = "#58f2c8"
const WiggleBackground = () => {
  const data = useStaticQuery(graphql`
    query WiggleBackground {
      madnessTile: file(absolutePath: { regex: "/madness_tile.png$/" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            src
          }
        }
      }
      sunglasses: file(
        absolutePath: { regex: "madness_theme/sunglasses.png$/" }
      ) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      iceCream: file(absolutePath: { regex: "madness_theme/ice_cream.png$/" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      pineapple: file(
        absolutePath: { regex: "madness_theme/pineapple.png$/" }
      ) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      flipFlops: file(
        absolutePath: { regex: "madness_theme/flip_flops.png$/" }
      ) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  const madnessTile = data.madnessTile.childImageSharp.fluid.src
  const sunglassesFluid = data.sunglasses.childImageSharp.fluid
  const iceCreamFluid = data.iceCream.childImageSharp.fluid
  const pineappleFluid = data.pineapple.childImageSharp.fluid
  const flipFlopsFluid = data.flipFlops.childImageSharp.fluid

  return (
    <div
      css={`
        background-image: url(${madnessTile});
        background-repeat: repeat;
        background-color: ${colour};
        position: relative;
        height: 100%;
      `}
    >
      <ImgContainer css="top: 0; left: 0;" ref={useWiggle(30)}>
        <Img fluid={pineappleFluid} fadeIn={false} loading="eager" />
      </ImgContainer>
      <ImgContainer css="top: 0; right: 0;" ref={useWiggle(-60)}>
        <Img fluid={sunglassesFluid} fadeIn={false} loading="eager" />
      </ImgContainer>
      <ImgContainer css="bottom: 0; left: 0;" ref={useWiggle(3)}>
        <Img fluid={flipFlopsFluid} fadeIn={false} loading="eager" />
      </ImgContainer>
      <ImgContainer css="bottom: 0; right: 0;" ref={useWiggle(15)}>
        <Img fluid={iceCreamFluid} fadeIn={false} loading="eager" />
      </ImgContainer>
    </div>
  )
}

export default WiggleBackground
