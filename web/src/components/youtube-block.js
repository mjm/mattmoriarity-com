import React from 'react'
import YouTube from 'react-youtube'
import getYouTubeId from 'get-youtube-id'

const YouTubeBlock = ({ node }) => {
  const id = getYouTubeId(node.url)
  return <YouTube videoId={id} />
}

export default YouTubeBlock
