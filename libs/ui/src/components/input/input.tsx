import clsx from 'clsx'
import React, { forwardRef } from 'react'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  errorMessage?: string
  success?: boolean
}

function InputComponent(
  { errorMessage, success, className, style, ...restProps }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <input
      className={clsx('border w-full text-sm rounded-md px-4 py-2', className)}
      style={style}
      ref={ref}
      {...restProps}
    />
  )
}

const Input = forwardRef(InputComponent)
export default Input
