import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const urlRegex = /^https:\/\/twitter.com\/.*\/status\/(\d+)/

const TweetBlock = ({ node }) => {
  const [, tweetId] = node.url.match(urlRegex)
  return <TwitterTweetEmbed tweetId={tweetId} />
}

export default TweetBlock
