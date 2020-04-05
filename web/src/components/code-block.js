import React from 'react'
import Prism from 'prismjs'
import Highlight from 'prism-react-renderer'
import styles from './code-block.module.scss'

import 'prismjs/components/prism-apacheconf'
import 'prismjs/components/prism-elm'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-swift'

Prism.languages.golang = Prism.languages.go

const CodeBlock = ({ node }) => {
  return (
    <Highlight Prism={Prism} code={node.code} language={node.language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${styles.code}`} style={style}>
          {tokens.map((line, i) => (
            <div
              {...getLineProps({
                line,
                key: i,
                className: styles.line
              })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
