import React from 'react'
import Img from 'gatsby-image'
import PortableText from './portableText'
import DateBubble from './date-bubble'
import { Syndication } from './syndication'
import styles from './blog.module.scss'
import Mentions from './mentions'
import useSiteMetadata from './site-metadata'

function BlogPost({
  _rawBody,
  title,
  slug,
  mainImage,
  publishedAt,
  prettyPublishedAt,
  syndication
}) {
  const { siteUrl } = useSiteMetadata()
  const url = slug.current && `${siteUrl}/${slug.current}/`

  return (
    <article className="h-entry">
      {mainImage && mainImage.asset && mainImage.asset.fluid && (
        <Img fluid={mainImage.asset.fluid} />
      )}
      <h1 className="p-name">{title}</h1>
      {/* {series.parts.length ? (
          <blockquote className={styles.series}>
            <p>This article is part of a series on {series.about}:</p>
            <ul>
              {series.parts.map((part, index) => (
                <li key={part.fields.slug}>
                  {part.fields.slug === slug ? (
                    <>
                      Part {index + 1}: {part.frontmatter.title}
                    </>
                  ) : (
                    <Link to={part.fields.slug}>
                      Part {index + 1}: {part.frontmatter.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </blockquote>
        ) : null}
        <div
          className={styles.tableOfContents}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        /> */}
      <div className="e-content">
        <PortableText blocks={_rawBody} />
      </div>
      <div className={styles.footer}>
        <DateBubble isoDate={publishedAt} className="dt-published">
          {prettyPublishedAt}
        </DateBubble>
      </div>
      <Syndication urls={syndication} />
      <Mentions url={url} />
    </article>
  )
}

export default BlogPost
