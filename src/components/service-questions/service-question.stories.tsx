import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceQuestion } from './service-question'

export default {
  title: 'General/ServiceQuestion',
  component: ServiceQuestion,
} as Meta

export function DefaultStarRating() {
  return <ServiceQuestion />
}
