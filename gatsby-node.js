const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const createPaginatedPages = require('gatsby-paginate')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            fields {
              slug
            }
            frontmatter {
              cover {
                childImageSharp{
                  fluid (maxWidth:500, quality:50){
                    src
                    srcSet
                    aspectRatio
                    sizes
                    base64
                  }
                }
                publicURL
              }
              title,
              tags
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const nodes = result.data.allMarkdownRemark.edges

  createPaginatedPages({
    edges: nodes,
    createPage: createPage,
    pageTemplate: 'src/templates/index.js',
    pageLength: 2, // This is optional and defaults to 10 if not used
    pathPrefix: '', // This is optional and defaults to an empty string if not used
    context: {}, // This is optional and defaults to an empty object if not used
  })

  nodes.forEach((edge, index) => {
    const prevNode = index === 0 ? null : nodes[index - 1].node
    const nextNode = index === (nodes.length - 1) ? null : nodes[index + 1].node
    const id = edge.node.id
    createPage({
      path: edge.node.fields.slug,
      tags: edge.node.frontmatter.tags,
      component: path.resolve(`src/templates/article-page.js`),
      // additional data can be passed via context
      context: {
        id,
        prevNode,
        nextNode,
      },
    })
  })

  // Tag pages:
  let tags = []
  // Iterate through each post, putting all found tags into `tags`
  nodes.forEach(edge => {
    tags = tags.concat(_.get(edge, `node.frontmatter.tags`, []))
  })
  // Eliminate duplicate tags
  tags = _.uniq(tags)

  /**
   * @see https://lodash.com/docs/4.17.11#kebabCase
   */
  tags.forEach(tag => {
    const tagPath = `/tags/${_.kebabCase(tag)}/`

    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tags.js`),
      context: {
        tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    /**
     * @example value === '/blog/test/'
     */
    const value = createFilePath({
      node,
      getNode,
    })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
