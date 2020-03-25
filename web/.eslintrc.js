module.exports = {
  extends: ['standard', 'standard-react', 'prettier-standard/prettier-file'],
  rules: {
    'react/prop-types': 0
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.8.4'
    }
  }
}
