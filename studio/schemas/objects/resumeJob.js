export default {
  name: 'resumeJob',
  type: 'object',
  title: 'Job',
  fields: [
    {
      name: 'company',
      type: 'string',
      title: 'Company'
    },
    {
      name: 'startDate',
      type: 'date',
      title: 'Start date',
      options: {
        dateFormat: 'MMM YYYY'
      }
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End date',
      options: {
        dateFormat: 'MMM YYYY'
      }
    },
    {
      name: 'description',
      type: 'excerptPortableText',
      title: 'Description'
    }
  ]
}
