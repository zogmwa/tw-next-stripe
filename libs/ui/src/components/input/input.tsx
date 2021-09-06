import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import { HiX, HiCheck, HiEye, HiEyeOff } from 'react-icons/hi'

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  errorMessage?: string
  success?: boolean
}

function InputComponent(
  { errorMessage, success, type, className, style, ...restProps }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const isPasswordInput = type === 'password'
  const showIcon = !isPasswordInput
  const showErrorIcon = showIcon && !!errorMessage
  const showSuccessIcon = showIcon && success && !errorMessage

  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className={clsx('relative', className)} style={style}>
      <input
        className={clsx(
          'border w-full text-sm rounded-md px-4 py-2 text-text-primary',
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
        type={isPasswordInput ? (passwordVisible ? 'text' : 'password') : type}
        {...restProps}
      />
      {showErrorIcon ? <HiX size={16} className="absolute pointer-events-none text-error top-3 right-3" /> : null}
      {errorMessage ? <div className="mt-1 text-xs text-error">{errorMessage}</div> : null}
      {showSuccessIcon ? (
        <HiCheck size={16} className="absolute pointer-events-none text-success top-3 right-3" />
      ) : null}
      {isPasswordInput ? (
        <button
          className="absolute top-2.5 right-2.5 p-0.5 rounded text-text-secondary"
          type="button"
          onClick={() => {
            setPasswordVisible((prevState) => !prevState)
          }}
        >
          {passwordVisible ? <HiEye /> : <HiEyeOff />}
        </button>
      ) : null}
    </div>
  )
}

export const Input = forwardRef(InputComponent)
