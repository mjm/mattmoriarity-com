import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const urlRegex = /^https:\/\/twitter.com\/.*\/status\/(\d+)/

const TweetBlock = ({ node }) => {
  if (!node || !node.url) {
    return null
  }
  const match = node.url.match(urlRegex)
  if (!match) {
    return null
  }
  return <TwitterTweetEmbed tweetId={match[1]} placeholder="Loading tweet…" />
}

export default TweetBlock
