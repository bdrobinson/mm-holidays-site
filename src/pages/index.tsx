import React, { FC } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
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
import CampVideos from "../components/CampVideos"

import instagram from "../images/instagram.svg"
import facebook from "../images/facebook.svg"
import HeadTags from "../components/HeadTags"
import { getImage } from "gatsby-plugin-image"

const HeroContainer = styled.div`
  position: relative;
`

const VIDEO_ID = "IF-ZT3kZsoo"
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

export const Head = ({ data }: Props) => {
  return (
    <HeadTags
      title={null}
      path="/"
      seoDescription={data.site.siteMetadata.seoDescription}
    />
  )
}

const IndexPage: FC<Props> = ({ data }: Props) => {
  return (
    <Layout
      showNav={true}
      theme="light"
      applyGutter={false}
      hero={
        <HeroContainer>
          <ImageCrossfade
            images={[
              getImage(data.hero1),
              getImage(data.hero2),
              getImage(data.hero3),
              getImage(data.hero4),
            ]}
            renderImage={image => {
              return (
                <GatsbyImage
                  image={image}
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
      }
    >
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
            image={getImage(frontmatter.image)}
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
      <Stack padding="2rem">
        <section
          id="watch-now"
          css={`
            background-image: url(${data.mayhemTile.childImageSharp.fluid.src});
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
              <StaticImage
                src="../images/madness_theme/mm_online_logo.png"
                width={500}
                layout="fixed"
                alt="The logo for M+M online"
                placeholder="tracedSVG"
              />
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
                <div css="position: relative; padding: 1em 1.5em;">
                  <p>
                    In summer 2020 the pandemic stopped us running camp as
                    usual, so we hosted M+M Online instead! You can catch up on
                    all the week&apos;s videos right here.
                  </p>
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
                        title="MAX"
                        age="9-11"
                        videos={[
                          {
                            weekday: "Monday",
                            url: "https://www.youtube.com/watch?v=6J03t1oHXXc",
                          },
                          {
                            weekday: "Tuesday",
                            url: "https://www.youtube.com/watch?v=QKcF0ldpQdc",
                          },
                          {
                            weekday: "Wednesday",
                            url: "https://youtu.be/Ri32B12G7X8",
                          },
                          {
                            weekday: "Thursday",
                            url: "https://youtu.be/j4bcwaV6ujU",
                          },
                          {
                            weekday: "Friday",
                            url: "https://youtu.be/PGJc-lSizLw",
                          },
                        ]}
                      />
                    </CampVideosContainer>
                    <CampVideosContainer>
                      <CampVideos
                        title="Madness"
                        age="11-14"
                        videos={[
                          {
                            weekday: "Monday",
                            url: "https://www.youtube.com/watch?v=wcHm4cbcPDo",
                          },
                          {
                            weekday: "Tuesday",
                            url: "https://www.youtube.com/watch?v=GNc9vsgL8bw",
                          },
                          {
                            weekday: "Wednesday",
                            url: "https://youtu.be/ofV6DoZ470s",
                          },
                          {
                            weekday: "Thursday",
                            url: "https://youtu.be/q-go9l3AVP0",
                          },
                          {
                            weekday: "Friday",
                            url: "https://youtu.be/qp4L3vVHqp0",
                          },
                        ]}
                      />
                    </CampVideosContainer>
                    <CampVideosContainer>
                      <CampVideos
                        title="Mayhem"
                        age="15-18"
                        videos={[
                          {
                            weekday: "Monday",
                            url: "https://www.youtube.com/watch?v=efa1Xzn_-bU",
                          },
                          {
                            weekday: "Tuesday",
                            url: "https://www.youtube.com/watch?v=xElbmFE8ygw",
                          },
                          {
                            weekday: "Wednesday",
                            url: "https://youtu.be/tjO7x6r8eX4",
                          },
                          {
                            weekday: "Thursday",
                            url: "https://youtu.be/iJ0RYZAtQD0",
                          },
                          {
                            weekday: "Friday",
                            url: "https://youtu.be/0S96OaEduwg",
                          },
                        ]}
                      />
                    </CampVideosContainer>
                  </div>
                </div>
              </div>
            </PageGutter>
          </Stack>
        </section>
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
                gatsbyImageData(
                  layout: FULL_WIDTH
                  quality: 90
                  placeholder: BLURRED
                )
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
        gatsbyImageData(layout: FULL_WIDTH, quality: 90, placeholder: BLURRED)
      }
    }
    hero2: file(relativePath: { eq: "sunset.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90, placeholder: BLURRED)
      }
    }
    hero3: file(relativePath: { eq: "tires.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90, placeholder: BLURRED)
      }
    }
    hero4: file(relativePath: { eq: "high_ropes.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, quality: 90, placeholder: BLURRED)
      }
    }
    onlineLogo: file(
      absolutePath: { regex: "madness_theme/mm_online_logo.png$/" }
    ) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed_withWebp_tracedSVG
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
