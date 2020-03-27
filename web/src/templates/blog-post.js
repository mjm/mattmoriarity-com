import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import BlogPost from '../components/blog-post'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { toPlainText } from '../lib/helpers'

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      prettyPublishedAt: publishedAt(formatString: "MMM D, Y")
      publishedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
      mainImage {
        asset {
          _id
          fluid(maxWidth: 675) {
            ...GatsbySanityImageFluid
          }
        }
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: { maxDepth: 5 })
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
    series: sanitySeries(posts: { elemMatch: { id: { eq: $id } } }) {
      title
      posts {
        id
        title
        slug {
          current
        }
      }
    }
  }
`

const BlogPostTemplate = props => {
  const { data, errors } = props
  const post = data && data.post
  const series = data && data.series

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
        />
      )}

      {errors && <GraphQLErrorList errors={errors} />}

      {post && <BlogPost {...post} series={series} />}
    </Layout>
  )
}

export default BlogPostTemplate
