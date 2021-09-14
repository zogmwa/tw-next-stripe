import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { Spinner } from '../spinner'

export type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children'
> & {
  loading?: boolean
  children?: string
  buttonType?: 'default' | 'primary' | 'tag'
  error?: boolean
  icon?: React.ReactNode
  iconPlacement?: 'left' | 'right'
  size?: 'small' | 'default'
}

function ButtonComponent(
  {
    children,
    buttonType = 'default',
    icon,
    iconPlacement = 'left',
    size = 'default',
    error,
    loading,
    className,
    style,
    ...restProps
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      className={clsx(
        (() => {
          switch (size) {
            case 'small': {
              return 'px-3 py-1 rounded space-x-2 text-xs'
            }
            default: {
              return 'px-4 py-2 rounded-md space-x-4 text-sm'
            }
          }
        })(),
        'border inline-flex items-center justify-center',
        (() => {
          if (error) {
            if (buttonType === 'default') {
              return 'border-error text-error'
            }
            return 'bg-error text-text-on-surface border-error'
          }

          if (buttonType === 'default') {
            return 'border-primary text-primary'
          }
          if (buttonType === 'tag') {
            return 'bg-background-default text-text-tertiary border-background-default'
          }
          return 'bg-primary text-text-on-surface border-primary'
        })(),
        className,
      )}
      style={style}
      {...restProps}
      ref={ref}
    >
      {loading ? <Spinner className="!text-text-on-surface" /> : null}
      {iconPlacement === 'left' ? icon : null}
      <span className="font-medium">{children}</span>
      {iconPlacement === 'right' ? icon : null}
    </button>
  )
}

export const Button = forwardRef(ButtonComponent)