import React from 'react'
import { Link } from 'gatsby'
import BasePortableText from '@sanity/block-content-to-react'
import { GoLink } from 'react-icons/go'
import Figure from './Figure'
import TweetBlock from './tweet-block'
import YouTubeBlock from './youtube-block'
import GistBlock from './gist-block'
import CodeBlock from './code-block'
import { anchor } from './blog.module.scss'

const BlockRenderer = props => {
  const { style = 'normal', slug = '' } = props.node
  if (/^h\d/.test(style)) {
    const Component = style
    return (
      <Component id={slug} style={{ position: 'relative' }}>
        <a href={`#${slug}`} className={anchor}>
          <GoLink size={16} />
        </a>
        {props.children}
      </Component>
    )
  }

  return BasePortableText.defaultSerializers.types.block(props)
}

const LinkRenderer = props => {
  const internal = /^\/(?!\/)/.test(props.mark.href)
  if (internal) {
    return <Link to={props.mark.href}>{props.children}</Link>
  } else {
    return <a href={props.mark.href}>{props.children}</a>
  }
}

const serializers = {
  types: {
    block: BlockRenderer,
    mainImage: Figure,
    tweet: TweetBlock,
    youtube: YouTubeBlock,
    gist: GistBlock,
    code: CodeBlock
  },
  marks: {
    link: LinkRenderer
  }
}

export default serializers
