import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { CustomAddPaymentCardDetail, AddPaymentCard, AddPaymentCardDetail } from './'

export default {
  title: 'General/AddPaymentCardDetail',
  component: CustomAddPaymentCardDetail,
} as Meta

export function StripeAddDetail() {
  return (
    <AddPaymentCardDetail
      addCard={(paymentMethod) => {
        console.log('[paymentMethod]:', paymentMethod)
      }}
    />
  )
}

export function StripeAddPaymentCardDetail() {
  return <AddPaymentCard />
}

export function CustomAddPaymentCard() {
  return <CustomAddPaymentCardDetail addCardFunction={() => {}} />
}
