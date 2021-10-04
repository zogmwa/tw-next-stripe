import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ReviewCard } from './review-card'

export default {
  title: 'General/ReviewCard',
  component: ReviewCard,
} as Meta

export function DefaultServiceReviewCard() {
  const review = {
    userPic: 'http://logo.clearbit.com/mailchimp.com',
    userName: 'Becky Howard',
    userPost: 'Product Manger',
    userCompany: 'XYZABC Corp.',
    reviewTitle: 'Good quality video and rich features',
    reviewBody:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    created_at: '2021-08-27T16:34:08.984019Z',
    helpedPeopleCount: '10',
    rating: '8',
  }

  return <ReviewCard review={review} />
}
