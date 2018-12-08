/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { setConfig } from "react-hot-loader"

export const onClientEntry = () => {
  // Needed to make react hooks work with HMR
  setConfig({ pureSFC: true })

  if (typeof window.IntersectionObserver === `undefined`) {
    // Needed to make gatsby-image blur-up effect work on safari etc
    import("intersection-observer")
  }
}
