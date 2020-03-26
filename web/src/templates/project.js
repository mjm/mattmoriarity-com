import React from 'react'
import { graphql } from 'gatsby'
import { FaGithub, FaTools } from 'react-icons/fa'
import styles from '../styles/project.module.scss'
import PortableText from '../components/portableText'
import Layout from '../components/layout'
import GraphQLErrorList from '../components/graphql-error-list'

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
      name
      repository
      uses
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`

const ProjectTemplate = ({ data, errors }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const project = data.project

  return (
    <Layout>
      <article className="h-entry">
        <h2 className="p-name">{project.name}</h2>
        <div className={styles.metadata}>
          {project.repository && (
            <div>
              <a
                href={`https://github.com/${project.repository}`}
                className={styles.repository}>
                <FaGithub />
                <span className={styles.label}>{project.repository}</span>
              </a>
            </div>
          )}
          {project.uses && project.uses.length ? (
            <div className={styles.uses}>
              <FaTools />
              <span className={styles.label}>
                {project.uses.join(', ').toLowerCase()}
              </span>
            </div>
          ) : null}
        </div>
        <div className="e-content">
          <PortableText blocks={project._rawBody} />
        </div>
      </article>
    </Layout>
  )
}

export default ProjectTemplate
