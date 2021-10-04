import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceReview } from './service-review'

export default {
  title: 'General/ServiceReview',
  component: ServiceReview,
} as Meta

export function DefaultStarRating() {
  return <ServiceReview />
}
