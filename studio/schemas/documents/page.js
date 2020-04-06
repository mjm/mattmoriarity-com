import { MdInsertDriveFile } from 'react-icons/md'

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: MdInsertDriveFile,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare({ title, slug }) {
      return {
        title: title || 'No title',
        subtitle: slug ? `/${slug}/` : '(no url)'
      }
    }
  }
}
