import React from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { IoSocialTwitter } from 'react-icons/lib/io'

const urlRegex = /^https:\/\/twitter.com\/.*\/status\/(\d+)/

const TweetPreview = ({ value }) => {
  if (!value || !value.url) {
    return 'no tweet URL set'
  }
  const match = value.url.match(urlRegex)
  if (!match) {
    return 'non-Twitter URL set'
  }
  return <TwitterTweetEmbed tweetId={match[1]} placeholder="Loading tweet…" />
}

export default {
  name: 'tweet',
  type: 'object',
  title: 'Tweet',
  icon: IoSocialTwitter,
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
