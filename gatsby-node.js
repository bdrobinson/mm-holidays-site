const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/page.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { path: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    throw new Error(result.errors)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
    })
  })
}
