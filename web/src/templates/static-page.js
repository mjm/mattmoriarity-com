import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../components/layout'
import PortableText from '../components/portableText'

export const query = graphql`
  query StaticPageTemplateQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      title
      slug {
        current
      }
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`

const StaticPageTemplate = props => {
  const { data, errors } = props
  const page = data && data.page
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {page && <SEO title={page.title} />}

      {errors && <GraphQLErrorList errors={errors} />}

      {page && (
        <article className="h-entry">
          <h2 className="p-name">{page.title}</h2>
          <div className="e-content">
            <PortableText blocks={page._rawBody} />
          </div>
        </article>
      )}
    </Layout>
  )
}

export default StaticPageTemplate
