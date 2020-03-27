export default {
  name: 'series',
  type: 'document',
  title: 'Post series',
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
          to: [{ type: 'post' }]
        }
      ],
      title: 'Posts',
      description: 'Ordered list of the posts that make up the series'
    }
  ]
}
