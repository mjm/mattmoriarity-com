import React from 'react'
import Figure from './Figure'
import TweetBlock from './tweet-block'
import YouTubeBlock from './youtube-block'

const serializers = {
  types: {
    mainImage: Figure,
    tweet: TweetBlock,
    youtube: YouTubeBlock,
    code: ({ node }) => {
      // TODO replace with Prism
      return (
        <pre>
          <code>{node.code}</code>
        </pre>
      )
    }
  }
}

export default serializers
