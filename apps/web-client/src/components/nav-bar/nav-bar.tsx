import React from 'react'
import clsx from 'clsx'

type NavBarProps = {
  className?: string
  style?: React.CSSProperties
}

export function NavBar({ className, style }: NavBarProps) {
  return (
    <div className={clsx('w-full h-14 bg-background-surface border-b px-4', className)} style={style}>
      <div className="flex items-center h-full max-w-screen-lg mx-auto">
        <div className="w-10 h-10 mr-2 bg-opacity-25 rounded-md bg-primary" />
        <div className="text-base font-medium tracking-wide text-opacity-50 text-primary">taggedweb</div>
      </div>
    </div>
  )
}
