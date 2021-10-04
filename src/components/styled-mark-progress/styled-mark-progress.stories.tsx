import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { MarkProgress } from './styled-mark-progress'

export default {
  title: 'General/MarkProgress',
  component: MarkProgress,
} as Meta

export function DefaultMarkProgress() {
  return <MarkProgress mark={4.5} topMark={5} height={15} label="Features" />
}
