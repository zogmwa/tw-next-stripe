import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { format as dateFormat } from 'date-fns'
import { BsDot } from 'react-icons/bs'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { ServiceReview } from '../../types/service-review'
import { StyledStarRating } from '../styled-star-rating'

type ReviewCardProps = {
  className?: string
  review: ServiceReview
}

function ReviewCardComponent({ className, review }: ReviewCardProps) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex items-center justify-start mb-2 space-x-4">
        <img src={review.userPic} alt="user" className="object-cover rounded-md w-9 h-9" />
        <div className="text-sm">
          <h3 className="font-medium text-text-primary">{review.userName}</h3>
          <p className="text-xs text-text-secondary">
            {review.userPost}
            <span className="px-2">@</span>
            {review.userCompany}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start w-full text-sm md:hidden">
        {review.reviewTitle}
        <StyledStarRating
          name="default"
          className="mt-1 space-x-1"
          defaultValue={Math.ceil(Number(review.rating)) / 2}
          precision={0.5}
          size="1rem"
          readOnly={true}
        />
      </div>
      <div className="items-center hidden w-full text-sm md:flex">
        {review.reviewTitle}
        <StyledStarRating
          name="default"
          className="ml-4 space-x-1"
          defaultValue={Math.ceil(Number(review.rating)) / 2}
          precision={0.5}
          size="1rem"
          readOnly={true}
        />
      </div>
      <TruncatedDescription description={review.reviewBody} className="mb-4 text-text-secondary" />
      <div className="flex items-center text-xs font-medium text-text-tertiary">
        <Button icon={<FaThumbsUp />} size="small">
          Helpful
        </Button>
        <div className="ml-2">{review.helpedPeopleCount} people found this helpful</div>
        <span className="hidden md:flex">
          <BsDot className="self-center mx-2" />
          {review.created_at && dateFormat(new Date(review.created_at), 'd MMMM, yyyy')}
        </span>
      </div>
    </div>
  )
}

export const ReviewCard = ReviewCardComponent
