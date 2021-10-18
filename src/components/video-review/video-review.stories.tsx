import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { VideoReviewCard } from './video-review'

export default {
  title: 'General/VideoReviewCard',
  component: VideoReviewCard,
} as Meta

export function DefaultVideoReview() {
  const review = {
    user: {
      username: 'Leah Andreson',
      first_name: 'Leah',
      last_name: 'Andreson',
      avatar: 'http://logo.clearbit.com/mailchimp.com',
      organization: {
        name: 'XYZABC Corp.',
      },
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: 7,
    created: '2021-08-29T16:34:08.984019Z',
    video_url: 'https://www.youtube.com/embed/cb1LWdUHxHs',
    upvotes_count: 8,
  }

  return <VideoReviewCard review={review} />
}
