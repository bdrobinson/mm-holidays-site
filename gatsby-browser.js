/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { setConfig } from "react-hot-loader"
import * as Sentry from "@sentry/browser"

export const onClientEntry = () => {
  // Needed to make react hooks work with HMR
  setConfig({ pureSFC: true })

  if (typeof window.IntersectionObserver === `undefined`) {
    // Needed to make gatsby-image blur-up effect work on safari etc
    import("intersection-observer")
  }

  Sentry.init({
    dsn: "https://d49a6e7848074da8b589d375b7c31ad7@sentry.io/1361844",
  })
}
