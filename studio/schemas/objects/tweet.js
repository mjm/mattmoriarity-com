import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

const urlRegex = /^https:\/\/twitter.com\/.*\/status\/(\d+)/

const TweetPreview = ({ value }) => {
  const [, tweetId] = value.url.match(urlRegex)
  return <TwitterTweetEmbed tweetId={tweetId} />
}

export default {
  name: 'tweet',
  type: 'object',
  title: 'Tweet',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Tweet URL'
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
    component: TweetPreview
  }
}
