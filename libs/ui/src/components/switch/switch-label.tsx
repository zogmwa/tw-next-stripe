import React, { ComponentProps } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import clsx from 'clsx'

type SwitchLabelProps = ComponentProps<typeof HeadlessSwitch.Label>

export function SwitchLabel({ className, ...rest }: SwitchLabelProps) {
  return <HeadlessSwitch.Label className={clsx('text-text-secondary', className)} {...rest} />
}
