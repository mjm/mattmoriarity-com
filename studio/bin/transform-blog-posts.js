const fs = require('fs')
const { JSDOM } = require('jsdom')
const blockTools = require('@sanity/block-tools')

const input = JSON.parse(fs.readFileSync(0, { encoding: 'utf8' }))
const schema = require('../schemas/schema')

const postType = schema.default.get('post')
const excerptBlockContentType = postType.fields.find(
  field => field.name === 'excerpt'
).type
const bodyBlockContentType = postType.fields.find(
  field => field.name === 'body'
).type

for (const post of input.data.allMarkdownRemark.nodes) {
  const slug = post.fields.slug.substr(1, post.fields.slug.length - 2)
  const newPost = {
    _id: slug.replace(/[^a-zA-Z0-9._-]/g, '-'),
    _type: 'post',
    title: post.frontmatter.title,
    publishedAt: post.frontmatter.date,
    slug: {
      _type: 'slug',
      current: slug
    }
  }
  if (post.frontmatter.syndication) {
    newPost.syndication = post.frontmatter.syndication
  }

  newPost.excerpt = blockTools.htmlToBlocks(
    post.excerpt,
    excerptBlockContentType,
    {
      parseHtml: html =>
        new JSDOM(html, { pretendToBeVisual: true }).window.document
    }
  )

  newPost.body = blockTools.htmlToBlocks(post.html, bodyBlockContentType, {
    parseHtml: html => new JSDOM(html).window.document,
    rules: [
      {
        deserialize(el, _next, block) {
          if (
            (el.tagName.toLowerCase() !== 'figure' &&
              el.tagName.toLowerCase() !== 'p') ||
            el.children.length === 0
          ) {
            return undefined
          }
          const img = el.children[0]
          if (img.tagName.toLowerCase() !== 'img') {
            return undefined
          }
          const src = img.getAttribute('src')
          if (src[0] === '/') {
            const url = `image@file:///Users/matt/Projects/gatsby-blog/static${src}`
            return block({
              _type: 'mainImage',
              alt: 'Image',
              _sanityAsset: url
            })
          } else {
            return block({
              _type: 'mainImage',
              alt: 'Image',
              _sanityAsset: `image@${src}`
            })
          }
        }
      },
      {
        deserialize(el, _next, block) {
          if (el.tagName.toLowerCase() !== 'p') {
            return undefined
          }
          if (!el.children.length) {
            return undefined
          }
          const iframe = el.children[0]
          if (iframe.tagName.toLowerCase() !== 'iframe') {
            return undefined
          }
          const src = iframe.getAttribute('src')
          if (!src.startsWith('https://www.youtube.com/embed')) {
            return undefined
          }
          const ytUrl = src
            .replace('embed/', 'watch?v=')
            .replace('?feature=oembed', '')
          return block({
            _type: 'youtube',
            url: ytUrl
          })
        }
      },
      {
        deserialize(el, _next, block) {
          if (el.tagName.toLowerCase() !== 'blockquote') {
            return undefined
          }
          const tweetLinks = el.querySelectorAll(
            'a[href^="https://twitter.com/"]'
          )
          if (!tweetLinks.length) {
            return undefined
          }
          let tweet = null
          tweetLinks.forEach(link => {
            const href = link.getAttribute('href')
            const match = href.match(/https:\/\/twitter.com\/\w+\/status\/\d+/)
            if (match) {
              tweet = match[0]
            }
          })
          if (!tweet) {
            return undefined
          }
          return block({
            _type: 'tweet',
            url: tweet
          })
        }
      },
      {
        deserialize(el, _next, block) {
          if (el.tagName.toLowerCase() !== 'pre') {
            return undefined
          }
          const language = el.className.replace('language-', '')
          return block({
            _type: 'code',
            language,
            code: el.textContent
          })
        }
      }
    ]
  })
  console.log(JSON.stringify(newPost))
}
