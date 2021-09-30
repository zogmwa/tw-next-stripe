import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddAFeature } from './add-a-feature'

export default {
  title: 'General/AddAFeature',
  component: AddAFeature,
} as Meta

export function DefaultAddAFeature() {
  return <AddAFeature />
}
