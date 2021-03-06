import React from 'react'
import { graphql } from 'gatsby'
import { format, parse } from 'date-fns'
import Layout from '../components/layout'
import * as styles from '../styles/resume.module.scss'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import PortableText from '../components/portableText'

const ResumePage = ({ data, errors }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const resume = data && data.sanityResume

  return (
    <Layout>
      <SEO title="Resume" />
      <article className="h-entry">
        <h2 className="p-name">Resume</h2>
        <div className="e-content">
          <PortableText blocks={resume._rawObjective} />
        </div>
        <Experience experience={resume._rawExperience} />
        <Education education={resume.education} />
        <Skills skills={{ languages: resume.languages, tools: resume.tools }} />
      </article>
    </Layout>
  )
}

function formatExperienceDate(str) {
  return str && format(parse(str, 'yyyy-MM-dd', new Date()), 'MMM yyyy')
}

const Experience = ({ experience }) => {
  return (
    <section className={styles.section}>
      <h3>Experience</h3>
      {experience.map((exp, i) => {
        const startDate = formatExperienceDate(exp.startDate)
        const endDate = formatExperienceDate(exp.endDate)

        return (
          <div key={i} className={styles.experience}>
            <div className={styles.header}>
              <h4 className={styles.company}>{exp.company}</h4>
              <div className={styles.dates}>
                {startDate} - {endDate || 'Now'}
              </div>
            </div>
            <PortableText blocks={exp.description} />
          </div>
        )
      })}
    </section>
  )
}

const Education = ({ education }) => {
  const { school, location, degree, year } = education
  return (
    <section className={`${styles.section} ${styles.education}`}>
      <h3>Education</h3>
      <h4>
        {school} – <em>{location}</em>
      </h4>
      <p>
        {degree}, {year}
      </p>
    </section>
  )
}

const Skills = ({ skills: { languages, tools } }) => {
  return (
    <section>
      <h3>Skills</h3>
      <div className={styles.skillLists}>
        <SkillList label="Languages" items={languages} />
        <SkillList label="Tools" items={tools} />
      </div>
    </section>
  )
}

const SkillList = ({ label, items }) => {
  return (
    <div className={styles.skillList}>
      <h4>{label}</h4>
      <div className={styles.skills}>
        {items.map(i => (
          <div key={i} className={styles.skill}>
            {i}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumePage

export const query = graphql`
  query ResumePage {
    sanityResume {
      id
      _rawObjective(resolveReferences: { maxDepth: 5 })
      _rawExperience(resolveReferences: { maxDepth: 5 })
      education {
        school
        location
        degree
        year(formatString: "YYYY")
      }
      languages
      tools
    }
  }
`
