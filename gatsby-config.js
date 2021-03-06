const proxy = require("http-proxy-middleware")
const dotenv = require("dotenv")
dotenv.config()

const getEnv = name => {
  const value = process.env[name]
  if (value == null) {
    throw new Error(`Could not find envvar with name '${name}'`)
  }
  return value
}

// undefined | string
const GA_ID = process.env["GOOGLE_ANALYTICS_ID"]

module.exports = {
  siteMetadata: {
    title: "M+M Holidays",
    seoDescription:
      "M+M is an action-packed holiday week for young people aged 9 to 18. It’s seven days of fun, friends and exploring big ideas from the Christian faith.",
    baseUrl: "https://madnessandmayhem.org.uk",
    campWeeks: [
      {
        week: 2021,
        shortDates: "Sat 24 – Sat 31 July",
        longDates: "Sat 24 – Sat 31 July",
      },
    ],
    homepage: {
      heroBookingPrompt: {
        title: "Bookings are now open",
        body: "Don't miss out – book your place today!",
      },
    },
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
    "gatsby-plugin-typescript",
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
        start_url: "/",
        background_color: "#fff",
        theme_color: "#fff",
        display: "browser",
        icon: "src/images/logo_black_square.png",
      },
    },
    ...(GA_ID != null
      ? [
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: GA_ID,
              anonymize: true,
              respectDNT: true,
            },
          },
        ]
      : []),
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
