import React from 'react'
import AceEditor from 'react-ace'
import {
  PatchEvent,
  set,
  unset,
  setIfMissing
} from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import DefaultSelect from 'part:@sanity/components/selects/default'
import TextField from 'part:@sanity/components/textfields/default'

import 'ace-builds/src-noconflict/mode-apache_conf'
import 'ace-builds/src-noconflict/mode-elm'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-swift'
import 'ace-builds/src-noconflict/mode-terraform'
import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-github'

const supportedLanguages = [
  { title: 'Apache conf', value: 'apache_conf' },
  { title: 'Elm', value: 'elm' },
  { title: 'Go', value: 'golang' },
  { title: 'HCL', value: 'hcl', editorLanguage: 'terraform' },
  { title: 'HTML', value: 'html' },
  { title: 'JavaScript', value: 'javascript' },
  { title: 'JSON', value: 'json' },
  { title: 'Plain text', value: 'text' },
  { title: 'Swift', value: 'swift' },
  { title: 'YAML', value: 'yaml' }
]

export const CodeInput = React.forwardRef(
  ({ type, value, level, onChange }, ref) => {
    const editor = React.useRef(null)
    React.useImperativeHandle(ref, () => ({
      focus() {
        editor.current && editor.current.focus()
      }
    }))

    const languages = supportedLanguages.slice()

    const selectedLanguage =
      value && value.language
        ? languages.find(item => item.value === value.language)
        : undefined

    if (!selectedLanguage) {
      languages.unshift({ title: 'Select language' })
    }

    const languageField = type.fields.find(field => field.name === 'language')
    const highlightedLinesField = type.fields.find(
      field => field.name === 'highlightLines'
    )

    function onLanguageChange(item) {
      onChange(
        PatchEvent.from([
          setIfMissing({ _type: type.name }),
          item ? set(item.value, ['language']) : unset(['language'])
        ])
      )
    }

    function onHighlightedLinesChange(e) {
      onChange(
        PatchEvent.from([
          setIfMissing({ _type: type.name }),
          e.target.value
            ? set(e.target.value, ['highlightLines'])
            : unset(['highlightLines'])
        ])
      )
    }

    function onCodeChange(code) {
      onChange(
        PatchEvent.from([
          setIfMissing({ _type: type.name }),
          code ? set(code, ['code']) : unset(['code'])
        ])
      )
    }

    const editorLanguage =
      (selectedLanguage &&
        (selectedLanguage.editorLanguage || selectedLanguage.value)) ||
      'text'

    return (
      <Fieldset
        legend={type.title}
        description={type.description}
        level={level}>
        <FormField level={level + 1} label={languageField.type.title}>
          <DefaultSelect
            onChange={onLanguageChange}
            value={selectedLanguage}
            items={languages}
          />
        </FormField>
        <TextField
          label={highlightedLinesField.type.title}
          onChange={onHighlightedLinesChange}
          value={(value && value.highlightLines) || ''}
        />
        <FormField
          label={(selectedLanguage && selectedLanguage.title) || 'Code'}
          level={level + 1}>
          <AceEditor
            onLoad={theEditor => {
              editor.current = theEditor
              editor.current.focus()
            }}
            mode={editorLanguage}
            theme="github"
            width="100%"
            value={(value && value.code) || ''}
            onChange={onCodeChange}
            tabSize={2}
          />
        </FormField>
      </Fieldset>
    )
  }
)
