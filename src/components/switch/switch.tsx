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
  disabledStateBackgroundColor?: String
  enabledStateBackgroundColor?: String
  disabledStateCircleColor?: String
  enabledStateCircleColor?: String
}

function SwitchComponent({
  className,
  circleClassname,
  enabled: outerEnabled,
  setEnabled: setOuterEnabled,
  disabledStateBackgroundColor,
  enabledStateBackgroundColor,
  disabledStateCircleColor,
  enabledStateCircleColor,
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

  function getDisabledStateBackgroundColor(): String {
    const backgroundColor =
      disabledStateBackgroundColor != null ? disabledStateBackgroundColor : 'bg-background-default border-border-light'
    return backgroundColor
  }

  function getEnabledStateBackgroundColor(): String {
    const backgroundColor =
      enabledStateBackgroundColor != null ? enabledStateBackgroundColor : 'bg-secondary border-secondary'
    return backgroundColor
  }

  function getDisabledStateCircleColor(): String {
    const circleColor =
      disabledStateCircleColor != null
        ? `translate-x-0 ${disabledStateCircleColor}`
        : 'translate-x-0 bg-background-dark'
    return circleColor
  }

  function getEnabledStateCircleColor(): String {
    const circleColor =
      enabledStateCircleColor != null ? `translate-x-3.5 ${enabledStateCircleColor}` : 'translate-x-3.5 bg-primary'
    return circleColor
  }

  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={setEnabled}
      className={clsx(
        'relative inline-flex items-center h-3.5 rounded-full w-7 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/75 border-2 box-content',
        enabled ? getEnabledStateBackgroundColor() : getDisabledStateBackgroundColor(),
        className,
      )}
    >
      <span
        className={clsx(
          'inline-block w-3.5 h-3.5 transform rounded-full transition-all',
          enabled ? getEnabledStateCircleColor() : getDisabledStateCircleColor(),
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
