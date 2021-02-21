import React from 'react'
import Prism from 'prismjs'
import Highlight from 'prism-react-renderer'
import rangeParser from 'parse-numeric-range'
import styles from './code-block.module.scss'

import 'prismjs/components/prism-apacheconf'
import 'prismjs/components/prism-elm'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-hcl'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-yaml'

Prism.languages.apache_conf = Prism.languages.apacheconf
Prism.languages.golang = Prism.languages.go

function calculateLinesToHighlight(lines) {
  if (lines) {
    const lineNumbers = rangeParser(lines)
    return index => lineNumbers.includes(index + 1)
  } else {
    return () => false
  }
}

const CodeBlock = ({ node }) => {
  if (!node || !node.code) {
    return null
  }

  const shouldHighlightLine = calculateLinesToHighlight(node.highlightLines)

  return (
    <Highlight
      Prism={Prism}
      code={node.code}
      language={node.language || 'text'}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} ${styles.code}`} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({
              line,
              key: i,
              className: styles.line
            })

            if (shouldHighlightLine(i)) {
              lineProps.className += ' highlight-line'
            }

            return (
              <div {...lineProps}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export default CodeBlock
