import React, { forwardRef, Ref, InputHTMLAttributes, DetailedHTMLProps } from 'react'
import clsx, { ClassValue } from 'clsx'
import { HiCheck } from 'react-icons/hi'

const SIZES = {
  lg: 'text-lg h-6 w-6 rounded-md',
  md: 'text-sm h-5 w-5 rounded',
  sm: 'text-xs h-4 w-4 rounded',
}

type CheckboxProps = {
  size?: keyof typeof SIZES
  className?: ClassValue
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>

function CheckboxComponent({ className, size = 'sm', ...rest }: CheckboxProps, ref: Ref<HTMLInputElement>) {
  return (
    <label className={clsx('relative inline-block flex-shrink', SIZES[size], className)}>
      <input
        className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none peer focus:ring-0"
        type="checkbox"
        {...rest}
        ref={ref}
      />
      <div className="min-w-full min-h-full bg-white border border-gray-200 rounded-[inherit] peer-checked:border-primary peer-checked:bg-primary transition-colors duration-75 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-primary/75" />
      <HiCheck className="absolute inset-0 m-auto text-transparent transition-transform duration-75 ease-in scale-50 peer-checked:text-white peer-checked:scale-100" />
    </label>
  )
}

export const Checkbox = forwardRef(CheckboxComponent)
