import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { PaymentSuccess } from '.'

export default {
  title: 'General/PaymentStatus',
  component: PaymentSuccess,
} as Meta

export function DefaultPaymentSuccess() {
  return <PaymentSuccess emailAddress="rudy@gmail.com" />
}
