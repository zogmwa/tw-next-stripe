import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AuthenticationPopup } from './authentication-popup'

export default {
  title: 'General/AuthenticationPopup',
  component: AuthenticationPopup,
} as Meta

export function DefaultReviewModal() {
  return <AuthenticationPopup />
}
