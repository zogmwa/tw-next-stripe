import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { format as dateFormat } from 'date-fns'
import { BsDot } from 'react-icons/bs'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { ServiceReview } from '../../types/service-review'
import { StyledStarRating } from '../styled-star-rating'
import { UserAvatar } from '../user-avatar'

type ReviewCardProps = {
  className?: string
  review: ServiceReview
}

function ReviewCardComponent({ className, review }: ReviewCardProps) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex items-center justify-start mb-2 space-x-4">
        <UserAvatar user={review.user} size={10} />
        <div className="text-md">
          <h3 className="font-medium text-text-primary">
            {review.user.username}
            <span className="px-2 text-xs text-text-secondary">
              {review.user.organization ? (review.user.organization.name ? '@' : '') : ''}
            </span>
            <span className="text-xs text-text-secondary">
              {review.user.organization ? review.user.organization.name ?? '' : ''}
            </span>
          </h3>
          <StyledStarRating
            name="totalMark"
            className="mt-1 space-x-1"
            defaultValue={Math.ceil(Number(review.rating)) / 2}
            precision={0.5}
            size="1rem"
            readOnly={true}
          />
        </div>
      </div>
      <TruncatedDescription description={review.content} className="mb-4 text-text-secondary" />
      <div className="flex items-center text-xs font-medium text-text-tertiary">
        <Button icon={<FaThumbsUp />} size="small">
          Helpful
        </Button>
        <div className="ml-2">{review?.upvotes_count ?? 0} people found this helpful</div>
        <span className="hidden md:flex">
          <BsDot className="self-center mx-2" />
          {review.created && dateFormat(new Date(review.created), 'd MMMM, yyyy')}
        </span>
      </div>
    </div>
  )
}

export const ReviewCard = ReviewCardComponent
