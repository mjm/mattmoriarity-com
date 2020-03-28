export default {
  name: 'resumeEducation',
  type: 'object',
  title: 'Education',
  fields: [
    {
      name: 'school',
      type: 'string',
      title: 'School'
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location'
    },
    {
      name: 'degree',
      type: 'string',
      title: 'Degree'
    },
    {
      name: 'year',
      type: 'date',
      title: 'Graduation year',
      options: {
        dateFormat: 'YYYY'
      }
    }
  ]
}
