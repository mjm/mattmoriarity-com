import React from 'react'
import { graphql, Link } from 'gatsby'
import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import { mapEdgesToNodes } from '../lib/helpers'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../components/layout'
import * as styles from '../components/blog.module.scss'

export const query = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          _type
          month: publishedAt(formatString: "YYYY/MM")
          year: publishedAt(formatString: "YYYY")
        }
      }
    }
    microposts: allSanityMicropost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          _type
          month: publishedAt(formatString: "YYYY/MM")
          year: publishedAt(formatString: "YYYY")
        }
      }
    }
  }
`

const ArchivePage = props => {
  const { data, errors } = props

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

  const allPosts = [...postNodes, ...micropostNodes]
  const groupedByYear = orderBy(
    Object.entries(groupBy(allPosts, 'year')),
    entry => entry[0],
    'desc'
  )

  return (
    <Layout>
      <SEO title="Archives" />
      <section>
        <h2>Archives</h2>
        {groupedByYear.map(([year, posts]) => {
          const groupedByMonth = orderBy(
            Object.entries(groupBy(posts, 'month')),
            entry => entry[0],
            'desc'
          )

          return (
            <section key={year}>
              <h3 className={styles.archiveYear}>{year}</h3>
              <ul className={styles.archives}>
                {groupedByMonth.map(([month, posts]) => (
                  <li key={month}>
                    <Link to={`/${month}/`}>{friendlyMonth(month)}</Link>{' '}
                    <span className={styles.articleCount}>
                      ({posts.length})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </section>
    </Layout>
  )
}

export default ArchivePage

function friendlyMonth(monthStr) {
  return format(parse(monthStr, 'yyyy/MM', new Date(0)), 'MMMM y')
}
