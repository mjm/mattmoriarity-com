export default {
  name: 'project',
  type: 'document',
  title: 'Project',
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
      name: 'description',
      type: 'excerptPortableText',
      title: 'Description'
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
