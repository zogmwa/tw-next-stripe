import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ReviewReaction } from './'

export default {
  title: 'General/ReviewReaction',
  component: ReviewReaction,
} as Meta

export function DefaultReviewReaction() {
  return (
    <ReviewReaction avgRating={1} statusType={1} className="space-x-2" isLoading={false} onChangeStatus={() => {}} />
  )
}
