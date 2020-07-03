const fs = require('fs')
const { Feed } = require('feed')
const { isFuture, parseISO } = require('date-fns')
const orderBy = require('lodash/orderBy')
const blocksToHtml = require('@sanity/block-content-to-html')
const fetch = require('isomorphic-unfetch')

// language=GraphQL
const query = `
  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      siteUrl
    }
    microposts: allSanityMicropost(
      limit: 20
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          _type
          id
          slug {
            current
          }
          publishedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          _rawBody(resolveReferences: { maxDepth: 5 })
        }
      }
    }
    posts: allSanityPost(
      limit: 20
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          _type
          id
          title
          _rawExcerpt(resolveReferences: { maxDepth: 5 })
          _rawBody(resolveReferences: { maxDepth: 5 })
          slug {
            current
          }
          publishedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        }
      }
    }
  }
`

exports.onPostBuild = async ({ graphql }, _pluginOptions) => {
  const { data } = await graphql(query)
  const { site, microposts, posts } = data

  const feed = new Feed({
    title: site.title,
    description: site.description,
    id: site.siteUrl,
    link: site.siteUrl,
    generator: 'Gatsby',
    feedLinks: {
      atom: `${site.siteUrl}/feed.xml`,
      json: `${site.siteUrl}/feed.json`
    }
  })

  const postNodes =
    microposts && posts
      ? orderBy(
          mapEdgesToNodes(microposts)
            .concat(mapEdgesToNodes(posts))
            .filter(filterOutDocsWithoutSlugs)
            .filter(filterOutDocsPublishedInTheFuture),
          'publishedAt',
          'desc'
        ).slice(0, 20)
      : []

  for (const post of postNodes) {
    await gatherOembed(post._rawBody)

    const url = `${site.siteUrl}/${post.slug.current}/`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post._rawExcerpt
        ? blocksToHtml({ blocks: post._rawExcerpt })
        : undefined,
      published: new Date(post.publishedAt),
      content: serializeBody(post._rawBody)
    })
  }

  await Promise.all([
    new Promise((yay, nah) => {
      fs.writeFile('./public/feed.json', feed.json1(), err =>
        err ? nah(err) : yay()
      )
    }),
    new Promise((yay, nah) => {
      fs.writeFile('./public/feed.xml', feed.rss2(), err =>
        err ? nah(err) : yay()
      )
    })
  ])
}

async function gatherOembed(blocks) {
  for (const block of blocks) {
    let res
    switch (block._type) {
      case 'tweet':
        res = await fetch(
          `https://publish.twitter.com/oembed?format=json&url=${encodeURIComponent(
            block.url
          )}`
        )
        if (res.ok) {
          const { html } = await res.json()
          block.html = html
        }
        break
      case 'youtube':
        res = await fetch(
          `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
            block.url
          )}`
        )
        if (res.ok) {
          const { html } = await res.json()
          block.html = html
        }
        break
    }
  }
}

const h = blocksToHtml.h

function serializeBody(body) {
  return blocksToHtml({
    blocks: body,
    serializers: {
      types: {
        code: ({ node: { code } }) => h('pre', h('code', code)),
        mainImage: ({ node: { asset } }) =>
          h('figure', h('img', { src: asset.url })),
        tweet: ({ node: { html = '' } }) => h('p', { innerHTML: html }),
        youtube: ({ node: { html = '' } }) => h('p', { innerHTML: html }),
        gist: ({ node: { url } }) =>
          h('p', h('a', { href: url, target: '_blank' }, 'View Gist on GitHub'))
      }
    }
  })
}

// inline these here because we can't import the helpers module directly
// in this context.

function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current
}

function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(parseISO(publishedAt))
}
