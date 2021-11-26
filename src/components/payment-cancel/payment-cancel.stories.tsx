import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { PaymentCancel } from '.'

export default {
  title: 'General/PaymentStatus',
  component: PaymentCancel,
} as Meta

export function DefaultPaymentCancel() {
  return <PaymentCancel />
}
