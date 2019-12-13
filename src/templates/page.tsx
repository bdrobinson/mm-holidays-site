import React, { FC } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import HeroImage from "../components/HeroImage"

interface Props {
  data: any
}

const Template: FC<Props> = ({ data }: Props) => {
  const frontmatter = data.markdownRemark.frontmatter
  const title = frontmatter.title
  const description = frontmatter.description
  const hasHero = frontmatter.hero != null

  return (
    <Layout
      title={title}
      seoDescription={description}
      path={frontmatter.path}
      hero={
        hasHero ? (
          <HeroImage
            imageAltText={frontmatter.heroAltText}
            fluid={frontmatter.hero.childImageSharp.fluid}
            title={title}
          />
        ) : null
      }
      theme={hasHero ? frontmatter.theme : null}
    >
      <section>
        {hasHero === false && <h1>{title}</h1>}
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </section>
    </Layout>
  )
}

export default Template

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        description
        hero {
          childImageSharp {
            ...FluidHeroImage
          }
        }
        heroAltText
        theme
      }
    }
  }
`
