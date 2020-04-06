import React from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

const Preview = ({ value }) => {
  if (!value || !value.url) {
    return 'no YouTube video URL set'
  }
  const id = getYouTubeId(value.url)
  if (!id) {
    return 'non-YouTube URL set'
  }
  return <YouTube videoId={id} />
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Video',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Video URL'
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
    component: Preview
  }
}
