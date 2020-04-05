import React from 'react'
import MdCode from 'react-icons/lib/md/code'

const CodeInput = props => {
  const RealCodeInput = require('./CodeInput').CodeInput
  return <RealCodeInput {...props} />
}

export default {
  name: 'code',
  type: 'object',
  title: 'Code',
  icon: MdCode,
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
