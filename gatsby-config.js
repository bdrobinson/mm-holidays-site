const proxy = require("http-proxy-middleware")

const { PRIMARY_COLOUR, PRIMARY_COLOUR_DARK } = require("./constants")

module.exports = {
  siteMetadata: {
    title: "M+M Holidays",
  },
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      }),
    )
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "M+M Holidays",
        short_name: "M+M Holidays",
        start_url: "/",
        background_color: PRIMARY_COLOUR,
        theme_color: PRIMARY_COLOUR_DARK,
        display: "browser",
        icon: "src/images/logo_black_square.png",
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-external-links",
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    "gatsby-plugin-catch-links",
  ],
}
