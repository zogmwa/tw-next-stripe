import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { HiX, HiCheck } from 'react-icons/hi'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  errorMessage?: string
  success?: boolean
}

function InputComponent(
  { errorMessage, success, className, style, ...restProps }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <div className={clsx('relative', className)} style={style}>
      <input
        className={clsx(
          'border w-full text-sm rounded-md px-4 py-2 text-gray-700',
          (() => {
            if (success) {
              return 'border-success'
            }

            if (errorMessage) {
              return 'border-error text-error'
            }

            return undefined
          })(),
        )}
        ref={ref}
        {...restProps}
      />
      {errorMessage && (
        <>
          <div className="text-xs text-error mt-1">{errorMessage}</div>
          <HiX size={16} className="text-error absolute top-3 right-3 pointer-events-none" />
        </>
      )}
      {success && !errorMessage ? (
        <HiCheck size={16} className="text-success absolute top-3 right-3 pointer-events-none" />
      ) : null}
    </div>
  )
}

const Input = forwardRef(InputComponent)
export default Input
