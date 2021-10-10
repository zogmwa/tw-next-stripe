import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddAQuestion } from './add-a-question'

export default {
  title: 'General/AddAQuestion',
  component: AddAQuestion,
} as Meta

export function DefaultAddAHighlight() {
  return <AddAQuestion />
}
