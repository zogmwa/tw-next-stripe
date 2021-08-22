import React from 'react'
import clsx from 'clsx'

export type ButtonProps = {
  children?: string
  className?: string
  style?: React.CSSProperties
}

export default function Button({ children, className, style }: ButtonProps) {
  return (
    <button className={clsx(className)} style={style}>
      {children}
    </button>
  )
}
