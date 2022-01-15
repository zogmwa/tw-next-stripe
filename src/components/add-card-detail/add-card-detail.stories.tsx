import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { CustomAddCardDetail, AddCard, AddCardDetail } from './'

export default {
  title: 'General/AddCardDetail',
  component: CustomAddCardDetail,
} as Meta

export function StripeAddDetail() {
  return (
    <AddCardDetail
      addCard={(paymentMethod) => {
        console.log('[paymentMethod]:', paymentMethod)
      }}
    />
  )
}

export function StripeAddCardDetail() {
  return <AddCard />
}

export function CustomAddCard() {
  return <CustomAddCardDetail addCardFunction={() => {}} />
}
