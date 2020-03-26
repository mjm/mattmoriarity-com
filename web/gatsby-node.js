const { isFuture, format } = require('date-fns')

async function createSanityPages(graphql, { createPage }) {
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
      allSanityMicropost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
      allSanityPage(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []
  const micropostEdges = (result.data.allSanityMicropost || {}).edges || []
  const pageEdges = (result.data.allSanityPage || {}).edges || []
  const projectEdges = (result.data.allSanityProject || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const { id, slug = {}, publishedAt } = edge.node
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/blog/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/blog-post.js'),
        context: { id }
      })
    })

  micropostEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const { id, slug = {} } = edge.node
      const path = `/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/micropost.js'),
        context: { id }
      })
    })

  pageEdges.forEach(edge => {
    const { id, slug = {} } = edge.node
    const path = `/${slug.current}/`

    createPage({
      path,
      component: require.resolve('./src/templates/static-page.js'),
      context: { id }
    })
  })

  projectEdges.forEach(edge => {
    const { id, slug = {} } = edge.node
    const path = `/projects/${slug.current}/`

    createPage({
      path,
      component: require.resolve('./src/templates/project.js'),
      context: { id }
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createSanityPages(graphql, actions)
}
