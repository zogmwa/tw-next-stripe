import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { Spinner } from '../spinner'

export type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children'
> & {
  loading?: boolean
  children?: string | number | React.ReactNode
  buttonType?: 'default' | 'primary' | 'tag' | 'homePage'
  error?: boolean
  icon?: React.ReactNode
  iconPlacement?: 'left' | 'right'
  size?: 'small' | 'default'
  textClassName?: string
  loadingClassName?: string
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
    textClassName,
    loadingClassName = '!text-text-on-surface',
    disabled = false,
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
            return 'bg-background-default text-text-tertiary border-background-dark'
          }
          if (buttonType === 'homePage') {
            return 'bg-green-400 text-white border-none'
          }
          return 'bg-primary text-text-on-surface border-primary'
        })(),
        className,
      )}
      style={style}
      {...restProps}
      ref={ref}
      disabled={disabled}
    >
      {loading ? <Spinner className={loadingClassName} /> : null}
      {iconPlacement === 'left' ? icon : null}
      <span className={clsx('font-medium', textClassName)}>{children}</span>
      {iconPlacement === 'right' ? icon : null}
    </button>
  )
}

export const Button = forwardRef(ButtonComponent)
