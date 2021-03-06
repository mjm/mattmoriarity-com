import React from 'react'
import { graphql } from 'gatsby'
import orderBy from 'lodash/orderBy'
import { format, parse } from 'date-fns'
import Layout from '../components/layout'
import GraphQLErrorList from '../components/graphql-error-list'
import { mapEdgesToNodes } from '../lib/helpers'
import BlogRoll from '../components/blog-roll'
import { archiveTitle } from '../components/blog.module.scss'

export const query = graphql`
  query ArchivePageTemplateQuery($dateStart: Date!, $dateEnd: Date!) {
    microposts: allSanityMicropost(
      filter: {
        publishedAt: { gte: $dateStart, lte: $dateEnd }
        slug: { current: { ne: null } }
      }
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          ...BlogRollMicropost
        }
      }
    }
    posts: allSanityPost(
      filter: {
        publishedAt: { gte: $dateStart, lte: $dateEnd }
        slug: { current: { ne: null } }
      }
    ) {
      edges {
        node {
          ...BlogRollPost
        }
      }
    }
  }
`

const ArchivePageTemplate = ({ data, errors, pageContext: { dateStart } }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)
  const micropostNodes =
    data && data.microposts && mapEdgesToNodes(data.microposts)

  const allPosts = orderBy(
    [...postNodes, ...micropostNodes],
    'publishedAt',
    'desc'
  )

  const title = format(parse(dateStart, 'yyyy-MM-00', new Date()), 'MMMM y')

  return (
    <Layout>
      <h2 className={archiveTitle}>{title}</h2>
      <BlogRoll posts={allPosts} />
    </Layout>
  )
}

export default ArchivePageTemplate
