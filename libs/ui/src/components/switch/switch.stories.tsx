import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Switch } from './switch'

export default {
  title: 'General/Switch',
  component: Switch,
} as Meta

export function SimpleSwitch() {
  const [enabled, setEnabled] = useState(false)

  return <Switch enabled={enabled} setEnabled={setEnabled} />
}
