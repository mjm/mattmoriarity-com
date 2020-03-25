import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
          title
          description
          siteUrl
          selfLinks
          webmentionUsername
        }
      }
    `
  )
  return site
}

export default useSiteMetadata
