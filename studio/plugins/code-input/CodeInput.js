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

import 'ace-builds/src-noconflict/mode-apache_conf'
import 'ace-builds/src-noconflict/mode-elm'
import 'ace-builds/src-noconflict/mode-golang'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-swift'
import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-github'

const supportedLanguages = [
  { title: 'Apache conf', value: 'apache_conf' },
  { title: 'Elm', value: 'elm' },
  { title: 'Go', value: 'golang' },
  { title: 'HTML', value: 'html' },
  { title: 'JavaScript', value: 'javascript' },
  { title: 'JSON', value: 'json' },
  { title: 'Plain text', value: 'text' },
  { title: 'Swift', value: 'swift' }
]

export const CodeInput = ({ type, value, level, onChange }) => {
  const languages = supportedLanguages.slice()

  const selectedLanguage =
    value && value.language
      ? languages.find(item => item.value === value.language)
      : undefined

  if (!selectedLanguage) {
    languages.unshift({ title: 'Select language' })
  }

  const languageField = type.fields.find(field => field.name === 'language')

  function onLanguageChange(item) {
    onChange(
      PatchEvent.from([
        setIfMissing({ _type: type.name }),
        item ? set(item.value, ['language']) : unset(['language'])
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

  return (
    <Fieldset legend={type.title} description={type.description} level={level}>
      <FormField level={level + 1} label={languageField.type.title}>
        <DefaultSelect
          onChange={onLanguageChange}
          value={selectedLanguage}
          items={languages}
        />
      </FormField>
      <FormField
        label={(selectedLanguage && selectedLanguage.title) || 'Code'}
        level={level + 1}>
        <AceEditor
          mode={(selectedLanguage && selectedLanguage.value) || 'text'}
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
