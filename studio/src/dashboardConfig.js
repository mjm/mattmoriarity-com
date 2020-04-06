export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'document-list',
      options: {
        title: 'Recent microblog posts',
        order: 'publishedAt desc',
        types: ['micropost'],
        limit: 5
      },
      layout: { width: 'large', height: 'small' }
    },
    {
      name: 'document-list',
      options: {
        title: 'Recent blog posts',
        order: 'publishedAt desc',
        types: ['post'],
        limit: 5
      },
      layout: { width: 'medium', height: 'small' }
    },
    {
      name: 'netlify',
      options: {
        description:
          'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
        sites: [
          {
            buildHookId: '5e796769867ac2c658a26ab6',
            title: 'Sanity Studio',
            name: 'mattmoriarity-com-studio',
            apiId: '1e790353-1fdb-49fa-934a-d2f003a362ed'
          },
          {
            buildHookId: '5e7967698e5ec8bcd9562cea',
            title: 'Blog Website',
            name: 'mattmoriarity-com',
            apiId: 'b53154b0-87c9-4f2e-9f56-3d17ff8f596b'
          }
        ]
      }
    },
    {
      name: 'project-info',
      options: {
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/mjm/mattmoriarity-com',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://mattmoriarity-com.netlify.com',
            category: 'apps'
          }
        ]
      },
      layout: { width: 'large' }
    }
  ]
}
