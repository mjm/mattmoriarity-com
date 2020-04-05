import Figure from './Figure'
import TweetBlock from './tweet-block'
import YouTubeBlock from './youtube-block'
import CodeBlock from './code-block'

const serializers = {
  types: {
    mainImage: Figure,
    tweet: TweetBlock,
    youtube: YouTubeBlock,
    code: CodeBlock
  }
}

export default serializers
