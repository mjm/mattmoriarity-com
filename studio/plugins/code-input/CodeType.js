import React from 'react'
import { GoCode } from 'react-icons/go'
import { DiCode, DiGo, DiJavascript1, DiSwift } from 'react-icons/di'

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
  ],
  preview: {
    select: {
      language: 'language'
    },
    prepare({ language }) {
      switch (language) {
        case 'golang':
          return { title: 'Go', media: DiGo }
        case 'javascript':
          return { title: 'JavaScript', media: DiJavascript1 }
        case 'json':
          return { title: 'JSON', media: DiCode }
        case 'swift':
          return { title: 'Swift', media: DiSwift }
        default:
          return { title: language, media: DiCode }
      }
    }
  }
}
