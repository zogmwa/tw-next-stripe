import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SubscribeComponent } from './newsletter-subscribe'

export default {
  title: 'General/SubscribeComponent',
  component: SubscribeComponent,
} as Meta

export function DefaultHomePageFooter() {
  return <SubscribeComponent />
}
