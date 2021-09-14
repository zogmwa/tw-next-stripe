import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { StarRating } from './star-rating'

export default {
  title: 'General/StarRating',
  component: StarRating,
} as Meta

export function DefaultStarRating() {
  const [rating, setRating] = useState(0)
  // eslint-disable-next-line no-console
  console.log(rating)
  return <StarRating onRatingChange={(ratingValue) => setRating(ratingValue)} />
}

export function StarRatingWithLabel() {
  const [rating, setRating] = useState(0)
  // eslint-disable-next-line no-console
  console.log(rating)
  return <StarRating onRatingChange={(ratingValue) => setRating(ratingValue)} label={'Overall Rating'} />
}
