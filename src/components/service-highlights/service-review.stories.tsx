import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceHighlight } from './service-highlight'

export default {
  title: 'General/ServiceHighlight',
  component: ServiceHighlight,
} as Meta

export function DefaultStarRating() {
  return <ServiceHighlight />
}
