import React from "react"
import { StaticQuery, graphql } from "gatsby"

type Props = {
  title: string | null
  seoDescription: string | null
  path: string | null
}

const HeadTags: React.FC<Props> = ({ title, seoDescription, path }: Props) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              seoDescription
              baseUrl
            }
          }
          defaultImage: file(relativePath: { eq: "hero0.jpg" }) {
            childImageSharp {
              fixed(width: 1200) {
                src
              }
            }
          }
        }
      `}
      render={data => {
        const pageTitle =
          title !== null
            ? `${title} | ${data.site.siteMetadata.title}`
            : data.site.siteMetadata.title
        const pageDescription =
          seoDescription !== null
            ? seoDescription
            : data.site.siteMetadata.seoDescription

        const pageImage = `${data.site.siteMetadata.baseUrl}${data.defaultImage.childImageSharp.fixed.src}`
        const imageAlt = "The M+M Online Logo"
        const pageUrl =
          path !== null ? `${data.site.siteMetadata.baseUrl}${path}` : null
        return (
          <>
            <title>{pageTitle}</title>
            <link
              href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Changa+One&display=swap"
              rel="stylesheet"
            ></link>
            <meta
              name="google-site-verification"
              content="0-r7dUs6bAexlQp3Uu5PN6SCyCqWpOdyuoABMYSkk8k"
            />
            <meta name="description" content={pageDescription} />

            <meta property="og:title" content={pageTitle} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={pageImage} />
            {pageUrl !== null && <meta property="og:url" content={pageUrl} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@madnesandmayhem" />
            <meta name="twitter:creator" content="@madnesandmayhem" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={pageImage} />
            <meta name="twitter:image:alt" content={imageAlt} />
            <meta name="og:image:alt" content={imageAlt} />
          </>
        )
      }}
    />
  )
}

export default HeadTags
