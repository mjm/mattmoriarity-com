import React from 'react'
import Prism from 'prismjs'
import Highlight from 'prism-react-renderer'

import 'prismjs/components/prism-apacheconf'
import 'prismjs/components/prism-elm'
import 'prismjs/components/prism-swift'

const CodeBlock = ({ node }) => {
  return (
    <Highlight Prism={Prism} code={node.code} language={node.language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
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
