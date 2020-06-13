import React, { useRef, FC } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled, { keyframes } from "styled-components"

import Layout from "../components/Layout"
import HomepageFeature from "../components/HomepageFeature"
import PageGutter from "../components/PageGutter"
import ImageCrossfade from "../components/ImageCrossfade"
import {
  SMALLSCREEN_WIDTH,
  MOBILE_WIDTH,
  HERO_IMAGE_MAX_HEIGHT,
  HERO_IMAGE_MIN_HEIGHT,
  PRIMARY_COLOUR_DARK,
  ENABLE_BOOKING,
} from "../constants"
import HeroBookingPrompt from "../components/HeroBookingPrompt"
import FooterBookingPrompt from "../components/FooterBookingPrompt"
import Stack from "../components/Stack"

import instagram from "../images/instagram.svg"
import email from "../images/email.svg"

const SHOW_ONLINE_PROMO = true

const HeroContainer = styled.div`
  position: relative;
`

const VIDEO_ID = "7RySP8tLL7U"

const anim = keyframes`
  from {
    opacity : 0;
  transform: translateY(50%);
  }

  to {
    transform: translateY(0%);
    opacity:1;
  }
`

const HeroLabelContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
`

const Tagline = styled.h1`
  color: white;
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.05em;
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    font-size: 3rem;
  }
  opacity: 0.9;
  padding-bottom: 2em;
`

const PromoVideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  margin-bottom: 4em;
`

const PromoVideo = styled.iframe.attrs({ title: "Promo Video" })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const HeroBookingNoticeContainer = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font-size: 0.8rem;
  width: 500px;
  background-color: white;
  color: #333;
  border-radius: 1em;
  border-width: 6px;
  border-color: white;
  border-style: none;
  @media (max-width: ${SMALLSCREEN_WIDTH}px) {
    display: none;
  }
  animation: ${anim} 0.5s cubic-bezier(0, 0, 0.06, 1.01);
  animation-delay: 0.3s;
  animation-fill-mode: both;
`

const BodyBookingNoticeContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  font-size: 0.9rem;
  & > * {
    width: 70%;
    @media (max-width: ${MOBILE_WIDTH}px) {
      width: 100%;
      max-width: 100%;
    }
  }
`

const BookingNoticeSection = styled.section`
  margin-top: 1em;
  @media (min-width: ${SMALLSCREEN_WIDTH}px) {
    display: none;
  }
`

interface Props {
  data: any
}

const IndexPage: FC<Props> = ({ data }: Props) => {
  const emailInputRef = useRef()
  return (
    <Layout
      showNav={!SHOW_ONLINE_PROMO}
      title={null}
      path="/"
      theme="light"
      applyGutter={false}
      seoDescription={data.site.siteMetadata.seoDescription}
      hero={
        !SHOW_ONLINE_PROMO ? (
          <HeroContainer>
            <ImageCrossfade
              fluids={[
                data.hero1.childImageSharp.fluid,
                data.hero2.childImageSharp.fluid,
                data.hero3.childImageSharp.fluid,
              ]}
              renderImage={fluid => {
                return (
                  <Img
                    fluid={fluid}
                    style={{
                      maxHeight: `${HERO_IMAGE_MAX_HEIGHT}px`,
                      minHeight: `${HERO_IMAGE_MIN_HEIGHT}px`,
                    }}
                    imgStyle={{ objectPosition: "center" }}
                    alt="The M+M site and available activities."
                  />
                )
              }}
            />
            <HeroLabelContainer>
              <div>
                <PageGutter>
                  <Tagline>
                    <span css="text-transform: uppercase; font-size: 1.8em; letter-spacing: 0.05em;">
                      Get ready
                    </span>
                    <br />
                    <span css="font-size: 0.9em;">
                      for the best week of the year
                    </span>
                  </Tagline>
                </PageGutter>
              </div>
            </HeroLabelContainer>
            <HeroBookingNoticeContainer>
              <HeroBookingPrompt />
            </HeroBookingNoticeContainer>
          </HeroContainer>
        ) : (
          <div css="position: relative;">
            <Img
              fluid={data.onlineHero.childImageSharp.fluid}
              alt="A camper going head-first down a water slide"
              style={{
                height: "100vh",
                imgStyle: { objectPosition: "center" },
              }}
            />
            <div
              css={`
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;

                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                text-align: center;
              `}
            >
              <Stack padding="3rem">
                <Img
                  css={`
                    width: 100%;
                    max-width: ${MOBILE_WIDTH * 0.7}px;
                    @media (max-width: ${MOBILE_WIDTH}px) {
                      max-width: 70%;
                    }
                  `}
                  fluid={data.onlineLogo.childImageSharp.fluid}
                  alt="M+M Online"
                  imgStyle={{ objectFit: "contain" }}
                />
                <div>
                  <div
                    css={`
                      font-size: 2.3rem;
                    `}
                  >
                    Mon 3rd &ndash; Fri 7th August 2020
                  </div>
                  <div
                    css={`
                      font-family: "Changa One";
                      font-size: 3.5rem;
                      text-transform: uppercase;
                    `}
                  >
                    New videos every day
                  </div>
                </div>
                <form
                  css={`
                    position: relative;
                    align-self: stretch;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                  `}
                  onSubmit={e => {
                    e.preventDefault()
                  }}
                >
                  <Stack padding="0.5rem">
                    <input
                      css={`
                        display: block;
                        border: none;
                        padding: 0.7em;
                        font-size: 1.4rem;
                        border-radius: 0.6rem;
                        width: 80%;
                        max-width: ${MOBILE_WIDTH}px;
                        box-sizing: border-box;
                      `}
                      type="email"
                      placeholder="joebloggs@email.com"
                      ref={emailInputRef}
                      name="emailAddress"
                    />
                    <button
                      type="submit"
                      css={`
                        font: inherit;
                        border: none;
                        background-color: #ff7bf4;
                        color: white;
                        font-weight: 700;
                        padding: 0.6em 1em;
                        font-size: 1rem;
                        cursor: pointer;
                        border-radius: 0.8rem;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                      `}
                    >
                      Give me email updates!
                    </button>
                  </Stack>
                </form>
              </Stack>
            </div>
          </div>
        )
      }
    >
      {!SHOW_ONLINE_PROMO && (
        <>
          <BookingNoticeSection>
            <BodyBookingNoticeContainer>
              <PageGutter>
                <HeroBookingPrompt />
              </PageGutter>
            </BodyBookingNoticeContainer>
            <div css="padding: 0 6em;">
              <hr
                css={`
                  border: none;
                  height: 2px;
                  width: 100%;
                  background-color: ${PRIMARY_COLOUR_DARK};
                  border-radius: 2px;
                  margin-bottom: 2em;
                `}
              />
            </div>
          </BookingNoticeSection>
          <section>
            <PageGutter>
              <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
              <PromoVideoContainer>
                <PromoVideo
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?&autoplay=1&rel=0&mute=1&modestbranding=1&loop=1&playlist=${VIDEO_ID}&fs=1`}
                  frameBorder="0"
                  allow="fullscreen;"
                />
              </PromoVideoContainer>
            </PageGutter>
          </section>
          {data.allMarkdownRemark.edges.map((edge: any) => {
            const frontmatter = edge.node.frontmatter
            return (
              <HomepageFeature
                key={edge.node.id}
                imageFluid={frontmatter.image.childImageSharp.fluid}
                imageAltText={frontmatter.imageAltText}
                title={frontmatter.title}
                subtitle={frontmatter.subtitle}
                descriptionHtml={edge.node.html}
              />
            )
          })}
          {ENABLE_BOOKING && (
            <section>
              <FooterBookingPrompt />
            </section>
          )}
        </>
      )}
      {SHOW_ONLINE_PROMO && (
        <>
          <PageGutter>
            <section
              dangerouslySetInnerHTML={{ __html: data.onlineCopy.html }}
            />
            <section
              css={`
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                margin-bottom: 1rem;
              `}
            >
              <div
                css={`
                  display: flex;
                  flex-flow: column nowrap;
                  align-items: flex-start;
                `}
              >
                <a
                  css="color: currentColor;"
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    if (emailInputRef.current) {
                      emailInputRef.current.focus()
                    }
                  }}
                >
                  <CtaItem
                    fontSize="1.5em"
                    imgSrc={email}
                    copy="Sign up for email updates"
                  />
                </a>
                <a
                  css="color: currentColor;"
                  href="https://www.instagram.com/mandmholidays/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CtaItem
                    fontSize="1.5em"
                    imgSrc={instagram}
                    copy="Follow us on Instagram"
                  />
                </a>
              </div>
            </section>
          </PageGutter>
        </>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        seoDescription
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//home/sections//" } }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            order
            imageAltText
            image {
              childImageSharp {
                ...FluidHeroImage
              }
            }
          }
          html
        }
      }
    }
    onlineCopy: markdownRemark(
      fileAbsolutePath: { regex: "//home/online.md/" }
    ) {
      html
    }
    hero1: file(relativePath: { eq: "inflatables.jpg" }) {
      childImageSharp {
        ...FluidHeroImage
      }
    }
    hero2: file(relativePath: { eq: "sunset.jpg" }) {
      childImageSharp {
        ...FluidHeroImage
      }
    }
    hero3: file(relativePath: { eq: "tires.jpg" }) {
      childImageSharp {
        ...FluidHeroImage
      }
    }
    onlineHero: file(relativePath: { eq: "online_hero.jpg" }) {
      childImageSharp {
        fluid(
          maxWidth: 1920
          srcSetBreakpoints: [400, 600, 960, 1280, 1600, 1920]
          quality: 90
          duotone: { highlight: "#ff7bf4", shadow: "#002f8a" }
          toFormat: PNG
        ) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    onlineLogo: file(relativePath: { eq: "mm-online-white.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: { regex: "/home/intro/" }) {
      html
    }
  }
`

interface CtaItemProps {
  imgSrc: string
  copy: string
  fontSize: string
}
const CtaItem: React.FC<CtaItemProps> = ({ imgSrc, copy, fontSize }) => {
  return (
    <div
      css={`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: currentColor;
      `}
    >
      <img
        style={{
          width: `calc(${fontSize} * 2.7)`,
          paddingRight: `calc(${fontSize} * 0.8)`,
        }}
        src={imgSrc}
      />
      <div css="font-weight: 700;" style={{ fontSize }}>
        {copy}
      </div>
    </div>
  )
}

export default IndexPage
