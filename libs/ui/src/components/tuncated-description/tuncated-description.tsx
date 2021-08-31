import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Button } from '../button'

type TruncatedDescriptionProps = {
  description: string
}

export function TruncatedDescription({ description }: TruncatedDescriptionProps) {
  const [renderFull, setRenderFull] = useState(false)
  return (
    <div className="flex flex-col items-start">
      {renderFull === false ? (
        <p>
          {description.substring(0, 170)}
          {'... '}
        </p>
      ) : (
        <p>
          <ReactMarkdown remarkPlugins={[gfm]}>{description}</ReactMarkdown>
        </p>
      )}
      <Button
        onClick={() => {
          if (renderFull === false) {
            setRenderFull(true)
          } else {
            setRenderFull(false)
          }
        }}
      >
        {renderFull === false ? 'See More' : 'See Less'}
      </Button>
    </div>
  )
}
