import React, { forwardRef } from 'react'
import clsx from 'clsx'

export type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children'
> & {
  children?: string
  buttonType?: 'default' | 'primary'
  error?: boolean
  icon?: React.ReactNode
  iconPlacement?: 'left' | 'right'
}

function ButtonComponent(
  {
    children,
    buttonType = 'default',
    icon,
    iconPlacement = 'left',
    error,
    className,
    style,
    ...restProps
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md text-sm border inline-flex space-x-4 items-center justify-center',
        (() => {
          if (error) {
            if (buttonType === 'default') {
              return 'border-error text-error'
            }
            return 'bg-error text-white border-error'
          }

          if (buttonType === 'default') {
            return 'border-primary text-primary'
          }
          return 'bg-primary text-white border-primary'
        })(),
        className,
      )}
      style={style}
      {...restProps}
      ref={ref}
    >
      {iconPlacement === 'left' ? icon : null}
      <span>{children}</span>
      {iconPlacement === 'right' ? icon : null}
    </button>
  )
}

const Button = forwardRef(ButtonComponent)
export default Button
