import React from 'react'
import GithubSlugger from 'github-slugger'
import clientConfig from '../../client-config'
import BasePortableText from '@sanity/block-content-to-react'
import serializers from './serializers'

const PortableText = ({ blocks, tableOfContents = false }) => {
  if (!blocks) {
    return null
  }

  addSlugsToHeaders(blocks)

  return (
    <>
      {tableOfContents ? <TableOfContents blocks={blocks} /> : null}
      <BasePortableText
        blocks={blocks}
        serializers={serializers}
        {...clientConfig.sanity}
      />
    </>
  )
}

export default PortableText

const TableOfContents = ({ blocks }) => {
  const roots = []
  const stack = []

  function pushBlock(level, block) {
    stack.push({
      level,
      text: toPlainText(block),
      slug: block.slug,
      children: []
    })
  }

  function popBlock() {
    const block = stack.pop()
    if (stack.length) {
      stack[stack.length - 1].children.push(block)
    } else {
      roots.push(block)
    }
  }

  for (const block of blocks) {
    if (block._type !== 'block' || !/^h\d/.test(block.style)) {
      continue
    }

    const level = +block.style.replace(/[^\d]/g, '')

    while (stack.length && stack[stack.length - 1].level >= level) {
      popBlock()
    }

    pushBlock(level, block)
  }

  while (stack.length) {
    popBlock()
  }

  if (!roots.length) {
    return null
  }

  return (
    <ul>
      {roots.map(root => (
        <TocEntry key={root.slug} {...root} />
      ))}
    </ul>
  )
}

const TocEntry = ({ text, slug, children }) => {
  return (
    <li>
      <p>
        <a href={`#${slug}`}>{text}</a>
      </p>
      {children.length ? (
        <ul>
          {children.map(child => (
            <TocEntry key={child.slug} {...child} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function addSlugsToHeaders(blocks) {
  const slugger = new GithubSlugger()

  for (const block of blocks) {
    if (block._type === 'block' && block.style.startsWith('h')) {
      block.slug = slugger.slug(toPlainText(block))
    }
  }
}

function toPlainText(block) {
  return block.children
    .filter(s => s._type === 'span')
    .map(s => s.text || '')
    .join('')
}
