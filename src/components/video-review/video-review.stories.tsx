import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { VideoReviewCard } from './video-review'

export default {
  title: 'General/VideoReviewCard',
  component: VideoReviewCard,
} as Meta

export function DefaultVideoReview() {
  const review = {
    userName: 'Yolanda Hanson',
    reviewBody: '"Very easy to use"',
    timestamp: '2021-08-27T16:34:08.984019Z',
    rating: '4',
    videoUrl: 'https://www.youtube.com/embed/cb1LWdUHxHs'
  }

  return <VideoReviewCard review={ review }/>
}
