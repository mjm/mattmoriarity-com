export default {
  name: 'micropost',
  type: 'document',
  title: 'Microblog Post',
  fields: [
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: doc => toPlainText(doc.body),
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing'
    },
    {
      name: 'syndication',
      type: 'syndication',
      title: 'Syndication links',
      description:
        'These are URLs that this post has been syndicated to on other sites or platforms'
    }
  ],
  initialValue() {
    return { publishedAt: new Date().toISOString() }
  },
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        }
      ]
    }
  ],
  preview: {
    select: {
      body: 'body'
    },
    prepare({ body }) {
      return {
        title: toPlainText(body) || 'No title'
      }
    }
  }
}

function toPlainText(blocks) {
  const block = (blocks || []).find(block => block._type === 'block')
  return block
    ? block.children
        .filter(child => child._type === 'span')
        .map(span => span.text)
        .join('')
    : null
}
