import React from 'react'
import { graphql } from 'gatsby'
import orderBy from 'lodash/orderBy'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import useSiteMetadata from '../components/site-metadata'
import BlogRoll from '../components/blog-roll'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    microposts: allSanityMicropost(
      limit: 30
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
          prettyPublishedAt: publishedAt(formatString: "MMM D, Y")
          publishedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          _rawBody(resolveReferences: { maxDepth: 5 })
        }
      }
    }
    posts: allSanityPost(
      limit: 30
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          _type
          id
          title
          _rawExcerpt
          slug {
            current
          }
          prettyPublishedAt: publishedAt(formatString: "MMM D, Y")
          publishedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        }
      }
    }
  }
`

const IndexPage = ({ data, errors }) => {
  const site = useSiteMetadata()

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes =
    data.microposts && data.posts
      ? orderBy(
          mapEdgesToNodes(data.microposts)
            .concat(mapEdgesToNodes(data.posts))
            .filter(filterOutDocsWithoutSlugs)
            .filter(filterOutDocsPublishedInTheFuture),
          'publishedAt',
          'desc'
        ).slice(0, 30)
      : []

  return (
    <Layout>
      <SEO title={site.title} description={site.description} />
      {postNodes && <BlogRoll posts={postNodes} />}
    </Layout>
  )
}

export default IndexPage
