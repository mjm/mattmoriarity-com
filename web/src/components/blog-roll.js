import React from 'react'
import { Link } from 'gatsby'
import useSiteMetadata from './site-metadata'
import { FaComment, FaThumbtack, FaHeart } from 'react-icons/fa'
import { DateBubbleLink } from './date-bubble'
import * as styles from './blog.module.scss'
import { MentionCount } from './mentions'
import PortableText from './portableText'

const BlogRoll = ({ posts }) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <div className="h-feed">
      {posts &&
        posts.map(post => (
          <BlogRollEntry key={post.id} post={post} siteUrl={siteUrl} />
        ))}
    </div>
  )
}

export const BlogRollEntry = ({ siteUrl, post, pinned }) => {
  const url = `/${post.slug.current}/`
  const fullUrl = siteUrl + url

  return (
    <div>
      <article className={`h-entry ${pinned ? styles.pinned : ''}`}>
        {post.title && (
          <h2 className="p-name">
            <Link className={styles.title} to={url}>
              {post.title}
            </Link>
          </h2>
        )}
        <div className="e-content">
          <PortableText
            blocks={
              post._type === 'post' ? post._rawExcerpt || [] : post._rawBody
            }
          />
        </div>
        {post._type === 'post' ? (
          <p>
            <Link to={url} className={styles.readMore}>
              Read more…
            </Link>
          </p>
        ) : null}
        <div className={styles.footer}>
          {pinned && (
            <div className={styles.pinnedLabel}>
              <FaThumbtack />
              <div>Pinned</div>
            </div>
          )}
          <MentionCount url={fullUrl}>
            {({ type }) => (
              <>
                {type.like ? (
                  <div className={styles.mentionCount}>
                    <FaHeart />
                    {type.like}
                  </div>
                ) : null}
                {type.reply ? (
                  <div className={styles.mentionCount}>
                    <FaComment />
                    {type.reply}
                  </div>
                ) : null}
              </>
            )}
          </MentionCount>
          <DateBubbleLink
            to={url}
            linkClassName={`u-url ${styles.dateBubble}`}
            className="dt-published"
            isoDate={post.publishedAt}>
            {post.prettyPublishedAt}
          </DateBubbleLink>
        </div>
      </article>
      {!pinned && <hr className={styles.separator} />}
    </div>
  )
}

export default BlogRoll
