const React = require('react')
const { withPrefix } = require('gatsby')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('link', {
      key: 'json-feed',
      rel: 'alternate',
      type: 'application/json',
      href: withPrefix('/feed.json')
    }),
    React.createElement('link', {
      key: 'rss-feed',
      rel: 'alternate',
      type: 'application/rss+xml',
      href: withPrefix('/feed.xml')
    })
  ])
}
