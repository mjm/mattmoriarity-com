import React from 'react'
import BasePortableText from '@sanity/block-content-to-react'
import Figure from './Figure'
import TweetBlock from './tweet-block'
import YouTubeBlock from './youtube-block'
import CodeBlock from './code-block'

const BlockRenderer = props => {
  const { style = 'normal', slug = '' } = props.node
  if (/^h\d/.test(style)) {
    const Component = style
    return <Component id={slug}>{props.children}</Component>
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
