import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AddCardDetail } from './add-card-detail'
import { AddCard } from './add-card'

export default {
  title: 'General/AddCardDetail',
  component: AddCardDetail,
} as Meta

export function StripeAddCardDetail() {
  return <AddCard />
}

export function DefaultAddCardDetail() {
  return <AddCardDetail addCardFunction={() => {}} />
}
