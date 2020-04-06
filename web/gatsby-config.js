// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd
      }
    },
    {
      resolve: '@jamesdanylik/gatsby-source-goodreads',
      options: {
        key: process.env.GOODREADS_API_KEY,
        id: '96331589'
      }
    },
    'gatsby-plugin-feeds',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass')
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/lib/typography',
        omitGoogleFont: true
      }
    },
    'gatsby-plugin-netlify'
  ]
}
