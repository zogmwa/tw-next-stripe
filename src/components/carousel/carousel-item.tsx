import clsx from 'clsx'
import React, { HTMLProps } from 'react'

type CarouselItemProps = HTMLProps<HTMLDivElement>

export function CarouselItem({ className, children, ...rest }: CarouselItemProps) {
  return (
    <div className={clsx('aspect-h-9 aspect-w-16', className)} {...rest}>
      {children}
    </div>
  )
}
