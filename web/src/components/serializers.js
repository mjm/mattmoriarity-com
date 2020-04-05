import React from 'react'
import BasePortableText from '@sanity/block-content-to-react'
import { GoLink } from 'react-icons/go'
import Figure from './Figure'
import TweetBlock from './tweet-block'
import YouTubeBlock from './youtube-block'
import CodeBlock from './code-block'
import styles from './blog.module.scss'

const BlockRenderer = props => {
  const { style = 'normal', slug = '' } = props.node
  if (/^h\d/.test(style)) {
    const Component = style
    return (
      <Component id={slug} style={{ position: 'relative' }}>
        <a href={`#${slug}`} className={styles.anchor}>
          <GoLink size={16} />
        </a>
        {props.children}
      </Component>
    )
  }

  return BasePortableText.defaultSerializers.types.block(props)
}

const serializers = {
  types: {
    block: BlockRenderer,
    mainImage: Figure,
    tweet: TweetBlock,
    youtube: YouTubeBlock,
    code: CodeBlock
  }
}

export default serializers
