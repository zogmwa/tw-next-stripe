import React, { ComponentProps } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import clsx from 'clsx'

type SwitchProps = ComponentProps<typeof HeadlessSwitch.Group>

export function SwitchGroup({ as = 'div', className, ...rest }: SwitchProps) {
  return <HeadlessSwitch.Group as={as} className={clsx('flex items-center space-x-1.5', className)} {...rest} />
}
