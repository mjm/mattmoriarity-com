import React from 'react'
import { GoCode } from 'react-icons/lib/go'

const CodeInput = props => {
  const RealCodeInput = require('./CodeInput').CodeInput
  return <RealCodeInput {...props} />
}

export default {
  name: 'code',
  type: 'object',
  title: 'Code',
  icon: GoCode,
  inputComponent: CodeInput,
  fields: [
    {
      title: 'Code',
      name: 'code',
      type: 'text'
    },
    {
      title: 'Language',
      name: 'language',
      type: 'string'
    }
  ]
}
