import { MdBuild } from 'react-icons/md'

export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  icon: MdBuild,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'repository',
      type: 'string',
      title: 'GitHub repository slug'
    },
    {
      name: 'website',
      type: 'url',
      title: 'Web site',
      description: 'Site for the project itself, rather than its source code'
    },
    {
      name: 'description',
      type: 'excerptPortableText',
      title: 'Description',
      description: 'Shown in the list of projects, but not on the project page'
    },
    {
      name: 'uses',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Technologies used',
      options: {
        layout: 'tags'
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
      name: 'name',
      repository: 'repository'
    },
    prepare({ name, repository }) {
      return {
        title: name,
        subtitle: repository
      }
    }
  }
}
