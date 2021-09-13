import clsx from 'clsx'
import React, { forwardRef } from 'react'

export type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
  errorMessage?: string
  success?: boolean
}

function TextareaComponent(
  { errorMessage, success, className, style, rows = 4, ...restProps }: TextareaProps,
  ref: React.Ref<HTMLTextAreaElement>,
) {
  return (
    <div className={clsx('relative', className)} style={style}>
      <textarea
        className={clsx(
          'border w-full text-sm rounded-md px-4 py-2 text-text-primary',
          success && 'border-success',
          errorMessage && 'border-error text-error',
        )}
        ref={ref}
        rows={rows}
        {...restProps}
      />

      {errorMessage ? <div className="mt-1 text-xs text-error">{errorMessage}</div> : null}
    </div>
  )
}

export const Textarea = forwardRef(TextareaComponent)
