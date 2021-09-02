import React, { useState } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import clsx, { ClassValue } from 'clsx'
import { SwitchLabel } from './switch-label'
import { SwitchGroup } from './switch-group'

type SwitchProps = {
  className?: ClassValue
  circleClassname?: ClassValue
  enabled?: boolean
  setEnabled?: (enabled: boolean) => void
}

function SwitchComponent({
  className,
  circleClassname,
  enabled: outerEnabled,
  setEnabled: setOuterEnabled,
}: SwitchProps) {
  const [innerEnabled, setInnerEnabled] = useState(false)
  const isControlled = outerEnabled !== undefined
  const enabled = outerEnabled ?? innerEnabled

  function setEnabled(value: boolean) {
    if (isControlled) {
      setOuterEnabled && setOuterEnabled(value)
    } else {
      setInnerEnabled(value)
    }
  }

  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={setEnabled}
      className={clsx(
        'relative inline-flex items-center h-3.5 rounded-full w-7 transition-colors border-2 box-content',
        enabled ? 'bg-blue-100 border-blue-100' : 'bg-gray-100 border-gray-100',
        className,
      )}
    >
      <span
        className={clsx(
          'inline-block w-3.5 h-3.5 transform rounded-full transition-all',
          enabled ? 'translate-x-3.5 bg-primary' : 'translate-x-0 bg-gray-500',
          circleClassname,
        )}
      />
    </HeadlessSwitch>
  )
}

export const Switch = Object.assign(SwitchComponent, {
  Group: SwitchGroup,
  Label: SwitchLabel,
})
