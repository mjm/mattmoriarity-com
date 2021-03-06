import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { cell } from '../styles/project.module.scss'
import GraphQLErrorList from '../components/graphql-error-list'
import { mapEdgesToNodes } from '../lib/helpers'
import PortableText from '../components/portableText'

const ProjectsPage = ({ data, errors }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const projectNodes = data && data.projects && mapEdgesToNodes(data.projects)

  return (
    <Layout>
      <Helmet>
        <title>Software Projects</title>
      </Helmet>
      <article>
        <h2>Software Projects</h2>
        {projectNodes.map(p => (
          <ProjectCell project={p} key={p._id} />
        ))}
      </article>
    </Layout>
  )
}

const ProjectCell = ({ project }) => {
  return (
    <div className={cell}>
      <Link to={`/projects/${project.slug.current}`}>
        <h3>{project.name}</h3>
        <PortableText blocks={project._rawDescription} />
      </Link>
    </div>
  )
}

export default ProjectsPage

export const query = graphql`
  query ProjectsPageQuery {
    projects: allSanityProject(sort: { fields: name, order: ASC }) {
      edges {
        node {
          _id
          name
          slug {
            current
          }
          _rawDescription(resolveReferences: { maxDepth: 5 })
        }
      }
    }
  }
`
