import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../components/layout'
import MicroblogPost from '../components/microblog-post'

export const query = graphql`
  query MicropostTemplateQuery($id: String!) {
    post: sanityMicropost(id: { eq: $id }) {
      prettyPublishedAt: publishedAt(formatString: "MMM D, Y")
      publishedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
      slug {
        current
      }
      syndication
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`

const MicropostTemplate = props => {
  const { data, errors } = props
  const post = data && data.post
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {post && <SEO title="Microblog post" />}

      {errors && <GraphQLErrorList errors={errors} />}

      {post && <MicroblogPost {...post} />}
    </Layout>
  )
}

export default MicropostTemplate
