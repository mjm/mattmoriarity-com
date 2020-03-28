export default {
  name: 'resume',
  type: 'document',
  title: 'Resume',
  fields: [
    {
      name: 'objective',
      type: 'excerptPortableText',
      title: 'Objective'
    },
    {
      name: 'education',
      type: 'resumeEducation',
      title: 'Education'
    },
    {
      name: 'experience',
      type: 'array',
      of: [{ type: 'resumeJob' }],
      title: 'Experience'
    },
    {
      name: 'languages',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Languages',
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'tools',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Tools',
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    prepare() {
      return { title: 'Resume' }
    }
  }
}
