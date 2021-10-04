import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { StyledStarRating } from './styled-star-rating'

export default {
  title: 'General/StyledStarRating',
  component: StyledStarRating,
} as Meta

export function DefaultStarRating() {
  return <StyledStarRating name="default" defaultValue={4.1} precision={0.5} size="3rem" readOnly={false} />
}
