import MdCode from 'react-icons/lib/md/code'
import { CodeInput } from './CodeInput'

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
