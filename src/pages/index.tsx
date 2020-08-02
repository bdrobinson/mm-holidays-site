import React, { FC } from "react"
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
  TINY_WIDTH,
  HERO_IMAGE_MAX_HEIGHT,
  HERO_IMAGE_MIN_HEIGHT,
  PRIMARY_COLOUR_DARK,
  ENABLE_BOOKING,
} from "../constants"
import HeroBookingPrompt from "../components/HeroBookingPrompt"
import FooterBookingPrompt from "../components/FooterBookingPrompt"
import Stack from "../components/Stack"
import WiggleBackground from "../components/WiggleBackground"
import OnlineTextbox from "../components/OnlineTextbox"
import CampVideos from "../components/CampVideos"

import instagram from "../images/instagram.svg"
import facebook from "../images/facebook.svg"

const SHOW_ONLINE_PROMO = true

const HeroContainer = styled.div`
  position: relative;
`

const VIDEO_ID = "7RySP8tLL7U"
const ONLINE_VIDEO_ID = "NjV8FzZcad0"

const MADNESS_THEME_BLACK = "#3B3561"
const MADNESS_THEME_BG_PRIMARY = "#58F2C8"
const MAYHEM_THEME_BLACK = "#53295f"
const MAYHEM_THEME_BG_PRIMARY = "#f2a578"

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

const CampVideosContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  @media (max-width: ${TINY_WIDTH}px) {
    margin-top: 0.5em;
  }
`

interface Props {
  data: any
}

const IndexPage: FC<Props> = ({ data }: Props) => {
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
            <div css="height: 100vh; overflow: hidden;">
              <WiggleBackground />
            </div>
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
              <Stack padding="1rem">
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
                <OnlineTextbox>
                  <Stack padding="1rem">
                    <div
                      css={`
                        font-size: 1.7rem;
                        color: ${MADNESS_THEME_BLACK};
                      `}
                    >
                      Mon 3rd &ndash; Fri 7th August 2020
                    </div>
                    <div
                      css={`
                        font-family: "Changa One";
                        font-size: 3rem;
                        text-transform: uppercase;
                        color: ${MADNESS_THEME_BLACK};
                      `}
                    >
                      New videos every day this week
                    </div>
                    <div css="display: flex; flex-flow: column nowrap; align-items: center;">
                      <a
                        href="#watch-now"
                        css={`
                          display: flex;
                          flex-flow: row nowrap;
                          align-items: center;
                          font: inherit;
                          font-family: "Changa One";
                          background-color: ${MADNESS_THEME_BG_PRIMARY};
                          color: ${MADNESS_THEME_BLACK};
                          padding: 0.3em 0.5em;
                          font-size: 2.5rem;
                          cursor: pointer;
                          border-radius: 0.8rem;
                          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                        `}
                      >
                        <div css="width: 1em" aria-hidden={true} />
                        <div>Watch now</div>
                        <svg
                          css="width: 1em; height: 1em; margin-left: 0.3em;"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path
                            d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </Stack>
                </OnlineTextbox>
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
        <Stack padding="2rem">
          <PageGutter>
            <section
              dangerouslySetInnerHTML={{ __html: data.onlineCopy1.html }}
            />
          </PageGutter>
          <section
            id="watch-now"
            css={`
              background-image: url(${data.mayhemTile.childImageSharp.fluid
                .src});
              background-repeat: repeat;
              background-color: ${MAYHEM_THEME_BG_PRIMARY};
              min-height: 100vh;
              display: flex;
              flex-flow: column nowrap;
              justify-content: center;
              align-items: center;
              color: ${MAYHEM_THEME_BLACK};
              font-size: 2rem;
              padding: 1em 0;
            `}
          >
            <Stack padding="1em">
              <div css="position: relative;">
                <img
                  src={data.textboxHeader.childImageSharp.fixed.src}
                  css={`
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                  `}
                />
                <div
                  css={`
                    padding: 0.2em 0.5em;
                    font-family: Changa One;
                    font-size: 5rem;
                    position: relative;
                    text-align: center;
                    @media (max-width: ${TINY_WIDTH}px) {
                      font-size: 4rem;
                    }
                  `}
                >
                  Watch now
                </div>
              </div>
              <PageGutter>
                <div
                  css={`
                    position: relative;
                    & a {
                      color: #ff6fba;
                    }
                    padding: 1em 0;
                  `}
                >
                  <img
                    src={data.textboxBody.childImageSharp.fixed.src}
                    css={`
                      position: absolute;
                      top: 0;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      width: 100%;
                      height: 100%;
                    `}
                  />
                  <div css="position: relative; padding: 1em;">
                    <div
                      css={`
                        display: flex;
                        flex-flow: row nowrap;
                        align-items: flex-start;
                        justify-content: center;
                        @media (max-width: ${TINY_WIDTH}px) {
                          flex-flow: column nowrap;
                          align-items: center;
                        }
                      `}
                    >
                      <CampVideosContainer>
                        <CampVideos
                          time="9am"
                          title="MAX"
                          age="9-11"
                          videos={[
                            {
                              weekday: "Monday",
                              url:
                                "https://www.youtube.com/watch?v=6J03t1oHXXc",
                            },
                            { weekday: "Tuesday", url: undefined },
                            { weekday: "Wednesday", url: undefined },
                            { weekday: "Thursday", url: undefined },
                            { weekday: "Friday", url: undefined },
                          ]}
                        />
                      </CampVideosContainer>
                      <CampVideosContainer>
                        <CampVideos
                          title="Madness"
                          time="10am"
                          age="11-14"
                          videos={[
                            {
                              weekday: "Monday",
                              url:
                                "https://www.youtube.com/watch?v=wcHm4cbcPDo",
                            },
                            { weekday: "Tuesday", url: undefined },
                            { weekday: "Wednesday", url: undefined },
                            { weekday: "Thursday", url: undefined },
                            { weekday: "Friday", url: undefined },
                          ]}
                        />
                      </CampVideosContainer>
                      <CampVideosContainer>
                        <CampVideos
                          title="Mayhem"
                          time="11am"
                          age="15-18"
                          videos={[
                            {
                              weekday: "Monday",
                              url:
                                "https://www.youtube.com/watch?v=efa1Xzn_-bU",
                            },
                            { weekday: "Tuesday", url: undefined },
                            { weekday: "Wednesday", url: undefined },
                            { weekday: "Thursday", url: undefined },
                            { weekday: "Friday", url: undefined },
                          ]}
                        />
                      </CampVideosContainer>
                    </div>
                    <div css="margin-top: 1em; font-size: 1.5rem;">
                      You can find all the links to the week&apos;s videos here.
                      Don&apos;t forget to browse our{" "}
                      <a
                        href="https://bit.ly/madnesscamp"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        online bookstall
                      </a>{" "}
                      and subscribe to us on{" "}
                      <a
                        href="https://www.youtube.com/channel/UCyHsEJmBEqYRM0AVsT9GCgg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        YouTube
                      </a>
                      !
                    </div>
                  </div>
                </div>
              </PageGutter>
            </Stack>
          </section>
          <PageGutter>
            <section
              dangerouslySetInnerHTML={{ __html: data.onlineCopy2.html }}
            />
          </PageGutter>
          <PageGutter>
            <section>
              <div
                css={`
                  position: relative;
                  overflow: hidden;
                  max-width: 100%;
                  width: 100%;
                  padding-bottom: 56.25%;
                  height: 0;
                `}
              >
                <PromoVideo
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${ONLINE_VIDEO_ID}?&autoplay=1&rel=0&mute=1&modestbranding=1&loop=1&playlist=${ONLINE_VIDEO_ID}&fs=1`}
                  frameBorder="0"
                  allow="fullscreen;"
                />
              </div>
            </section>
          </PageGutter>
          <PageGutter>
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
                <a
                  css="color: currentColor;"
                  href="https://www.facebook.com/Madnessandmayhemholidays/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CtaItem
                    fontSize="1.5em"
                    imgSrc={facebook}
                    copy="Follow us on Facebook"
                  />
                </a>
              </div>
            </section>
          </PageGutter>
        </Stack>
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
    onlineCopy1: markdownRemark(
      fileAbsolutePath: { regex: "//home/online1.md/" }
    ) {
      html
    }
    onlineCopy2: markdownRemark(
      fileAbsolutePath: { regex: "//home/online2.md/" }
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
    onlineLogo: file(
      absolutePath: { regex: "madness_theme/mm_online_logo.png$/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: { regex: "/home/intro/" }) {
      html
    }
    mayhemTile: file(absolutePath: { regex: "/mayhem_tile.png$/" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          src
        }
      }
    }
    textboxBody: file(absolutePath: { regex: "/textbox_body.png$/" }) {
      childImageSharp {
        fixed(width: 800) {
          src
        }
      }
    }
    textboxHeader: file(absolutePath: { regex: "/online_textbox.png$/" }) {
      childImageSharp {
        fixed(width: 800) {
          src
        }
      }
    }
  }
`

interface CtaItemProps {
  imgSrc: string
  copy: string
  fontSize: string
}
// eslint-disable-next-line react/prop-types
const CtaItem: React.FC<CtaItemProps> = ({ imgSrc, copy, fontSize }) => {
  const imgSize = `calc(${fontSize} * 2.7)`
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
          width: imgSize,
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
