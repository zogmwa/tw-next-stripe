import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ReviewCard } from './review-card'

export default {
  title: 'General/ReviewCard',
  component: ReviewCard,
} as Meta

export function DefaultServiceReviewCard() {
  const review = {
    user: {
      username: 'Test account2',
      first_name: 'Admin',
      last_name: 'admin',
      avatar: 'http://logo.clearbit.com/mailchimp.com',
      organization: {
        name: 'XYZABC Corp.',
      },
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: 2,
    created: '2021-08-28T16:34:08.984019Z',
    video_url: 'https://www.youtube.com/embed/cb1LWdUHxHs',
    upvotes_count: 1,
  }

  return <ReviewCard review={review} />
}
