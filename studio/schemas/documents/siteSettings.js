import { MdSettings } from 'react-icons/md'

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  icon: MdSettings,
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'siteUrl',
      type: 'url',
      title: 'Site URL',
      description: 'Used to generate URLs for posts in feeds.'
    },
    {
      name: 'selfLinks',
      type: 'array',
      of: [
        {
          type: 'url',
          title: ''
        }
      ],
      title: 'Self links',
      description: 'Add links to your other profiles on the web.'
    },
    {
      name: 'webmentionUsername',
      type: 'string',
      title: 'Webmention username'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ]
}
