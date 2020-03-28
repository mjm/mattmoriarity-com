const { isFuture, parseISO } = require('date-fns')

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
            month: publishedAt(formatString: "YYYY/MM")
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
            month: publishedAt(formatString: "YYYY/MM")
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

  const archiveMonths = new Set()

  postEdges
    .filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach(edge => {
      const { id, slug = {}, month } = edge.node
      const path = `/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/blog-post.js'),
        context: { id }
      })

      archiveMonths.add(month)
    })

  micropostEdges
    .filter(edge => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach(edge => {
      const { id, slug = {}, month } = edge.node
      const path = `/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/micropost.js'),
        context: { id }
      })

      archiveMonths.add(month)
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

  for (const archiveMonth of archiveMonths) {
    const [year, month] = archiveMonth.split('/')

    createPage({
      path: archiveMonth,
      component: require.resolve('./src/templates/archive-page.js'),
      context: {
        dateStart: `${year}-${month}-00`,
        dateEnd: `${year}-${month}-99`
      }
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  await createSanityPages(graphql, actions)
}
