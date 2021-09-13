import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Stepper } from './stepper'

export default {
  title: 'General/Stepper',
  component: Stepper,
} as Meta

export function DefaultStepper() {
  return (
    <Stepper
      steps={[
        { id: 'basic-information', name: 'Basic Information' },
        { id: 'detailed-information', name: 'Detailed Information' },
        { id: 'pricing', name: 'Pricing' },
        { id: 'q-and-a', name: 'Q & A' },
      ]}
      activeIndex={0}
      className="w-64"
    />
  )
}

export function CompletedStepper() {
  return (
    <Stepper
      steps={[
        { id: 'basic-information', name: 'Basic Information' },
        { id: 'detailed-information', name: 'Detailed Information' },
        { id: 'pricing', name: 'Pricing' },
        { id: 'q-and-a', name: 'Q & A' },
      ]}
      activeIndex={2}
      className="w-64"
    />
  )
}
