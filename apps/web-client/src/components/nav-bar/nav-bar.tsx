import React from 'react'
import clsx from 'clsx'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

export function NavBar({ className, style }: NavBarProps) {
  return <div className={clsx('w-full h-12 bg-white border-b', className)} style={style} />
}
