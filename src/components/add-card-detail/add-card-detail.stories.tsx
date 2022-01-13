import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddCardDetail } from './add-card-detail'

export default {
  title: 'General/AddCardDetail',
  component: AddCardDetail,
} as Meta

export function DefaultAddCardDetail() {
  return <AddCardDetail addCardFunction={() => {}} />
}
