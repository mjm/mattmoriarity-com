import React from 'react'
import { GoCode } from 'react-icons/lib/go'

const CodeInput = React.forwardRef((props, ref) => {
  const RealCodeInput = require('./CodeInput').CodeInput
  return <RealCodeInput ref={ref} {...props} />
})

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
