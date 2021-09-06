import React, { useState } from 'react'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { MAX_DESCRIPTION_LENGTH } from '../../utils/constants'

type TruncatedDescriptionProps = {
  description: string
  maxLength?: number
  className?: string
  style?: React.CSSProperties
}

export function TruncatedDescription({
  description,
  maxLength = MAX_DESCRIPTION_LENGTH,
  className,
  style,
}: TruncatedDescriptionProps) {
  const [renderFull, setRenderFull] = useState(false)

  return (
    <div
      className={clsx(renderFull ? 'space-y-2' : 'space-x-2', 'text-sm text-text-secondary', className)}
      style={style}
    >
      <ReactMarkdown remarkPlugins={[gfm]} className={clsx(renderFull ? 'space-y-2' : 'inline-block')}>
        {renderFull ? description : description.substring(0, maxLength)}
      </ReactMarkdown>
      <button
        onClick={() => {
          setRenderFull((prevState) => !prevState)
        }}
        className="text-xs cursor-pointer text-text-tertiary"
      >
        {renderFull === false ? 'See More...' : 'See Less'}
      </button>
    </div>
  )
}
