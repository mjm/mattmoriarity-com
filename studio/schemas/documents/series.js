import { MdFormatListNumbered, MdDescription } from 'react-icons/md'

export default {
  name: 'series',
  type: 'document',
  title: 'Post series',
  icon: MdFormatListNumbered,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Descriptive title for the series of posts'
    },
    {
      name: 'posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
          icon: MdDescription
        }
      ],
      title: 'Posts',
      description: 'Ordered list of the posts that make up the series'
    }
  ],
  preview: {
    select: {
      title: 'title',
      posts: 'posts'
    },
    prepare({ title, posts }) {
      return {
        title: title || 'No title',
        subtitle:
          posts && posts.length
            ? `${posts.length} post${posts.length === 1 ? '' : 's'}`
            : 'No posts'
      }
    }
  }
}
