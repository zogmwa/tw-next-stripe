import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddAHighlight } from './add-a-highlight'

export default {
  title: 'General/AddAHighlight',
  component: AddAHighlight,
} as Meta

export function DefaultAddAHighlight() {
  return <AddAHighlight />
}
