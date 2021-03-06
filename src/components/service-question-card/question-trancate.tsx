import React, { useState } from 'react'
import clsx from 'clsx'
import { MAX_DESCRIPTION_LENGTH } from '@taggedweb/utils/constants'

type TruncatedDescriptionProps = {
  description: string
  maxLength?: number
  className?: string
  style?: React.CSSProperties
}

export function QuestionTruncated({
  description,
  maxLength = MAX_DESCRIPTION_LENGTH,
  className,
  style,
}: TruncatedDescriptionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderFull, setRenderFull] = useState(false)
  const isOverFlowingText = description?.length >= maxLength

  return (
    <div className={clsx(renderFull ? 'space-y-1' : '', 'text-sm text-text-secondary', className)} style={style}>
      <div className="text-sm text-text-secondary" dangerouslySetInnerHTML={{ __html: description }} />
      {/** TODO: Render truncated html which keeping styles */}
      <button className="text-xs cursor-pointer text-text-tertiary">
        {isOverFlowingText ? (renderFull === false ? 'See More...' : 'See Less') : ''}
      </button>
    </div>
  )
}
