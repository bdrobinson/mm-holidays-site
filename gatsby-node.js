const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/page.js`)
  const campProfileTemplate = path.resolve(`src/templates/camp.js`)

  const pages = await graphql(`
    query MyQuery {
      allMarkdownRemark(filter: { frontmatter: { path: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              path
              template
            }
          }
        }
      }
    }
  `)

  if (pages.errors) {
    throw new Error(pages.errors)
  }

  pages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    switch (node.frontmatter.template) {
      case "CAMP_PROFILE": {
        createPage({
          path: node.frontmatter.path,
          component: campProfileTemplate,
        })
        return
      }
      default:
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
        })
    }
  })
}
