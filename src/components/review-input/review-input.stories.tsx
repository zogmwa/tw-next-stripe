import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ReviewInput } from './review-input'

export default {
  title: 'General/ReviewInput',
  component: ReviewInput,
} as Meta

export function DefaultReviewInputComponent() {
  return (
    <ReviewInput
      serviceName={'Zoom'}
      onSubmit={(data) => {
        // eslint-disable-next-line no-console
        console.log(data)
      }}
    />
  )
}
