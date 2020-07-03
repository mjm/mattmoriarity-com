import React from 'react'
import ReactEmbedGist from 'react-embed-gist'

import styles from './gist-block.module.scss'

const urlRegex = /^https:\/\/gist\.github\.com\/(.*)\/?/

const GistBlock = ({ node }) => {
  if (!node || !node.url) {
    return null
  }
  const match = node.url.match(urlRegex)
  if (!match) {
    return null
  }
  return <ReactEmbedGist gist={match[1]} titleClass={styles.gistTitle} />
}

export default GistBlock
