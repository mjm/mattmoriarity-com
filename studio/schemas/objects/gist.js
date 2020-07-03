import 'regenerator-runtime'
import React from 'react'
import ReactEmbedGist from 'react-embed-gist'
import { IoLogoGithub } from 'react-icons/io'

const urlRegex = /^https:\/\/gist\.github\.com\/(.*)\/?/

const GistPreview = ({ value }) => {
  if (!value || !value.url) {
    return 'no gist URL set'
  }
  const match = value.url.match(urlRegex)
  if (!match) {
    return 'non-Gist URL set'
  }
  return <ReactEmbedGist gist={match[1]} />
}

export default {
  name: 'gist',
  type: 'object',
  title: 'Gist',
  icon: IoLogoGithub,
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Gist URL'
    },
    {
      name: 'fileName',
      type: 'string',
      title: 'Filename',
      description: 'Name of a single file from the Gist to display.'
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
    component: GistPreview
  }
}
