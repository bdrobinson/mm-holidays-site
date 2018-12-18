module.exports = {
  siteMetadata: {
    title: "M+M Holidays",
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
        background_color: "#663399",
        theme_color: "#663399",
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
          {
            resolve: "gatsby-remark-external-links",
          },
        ],
      },
    },
    "gatsby-plugin-catch-links",
  ],
}
