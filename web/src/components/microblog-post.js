import React from 'react'
import PortableText from './portableText'
import { footer } from './blog.module.scss'
import DateBubble from './date-bubble'
import Mentions from './mentions'
import useSiteMetadata from './site-metadata'
import { Syndication } from './syndication'

const MicroblogPost = ({
  slug,
  publishedAt,
  prettyPublishedAt,
  syndication,
  _rawBody
}) => {
  const { siteUrl } = useSiteMetadata()
  const url = slug.current && `${siteUrl}/${slug.current}/`

  return (
    <article className="h-entry">
      <div className="p-name e-content">
        <PortableText blocks={_rawBody} />
      </div>
      <div className={footer}>
        <DateBubble isoDate={publishedAt} className="dt-published">
          {prettyPublishedAt}
        </DateBubble>
      </div>
      <Syndication urls={syndication} />
      <Mentions url={url} />
    </article>
  )
}

export default MicroblogPost
