import React, { useMemo } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FaThumbsUp } from 'react-icons/fa'
import { TruncatedDescription } from '../tuncated-description'
import { Button } from '../button'
import { ServiceReview } from '../../types/service-review'

type ReviewCardProps = {
  review: ServiceReview
}

function ReviewCardComponent({ review }: ReviewCardProps) {
  const time = useMemo(() => {
    const date = new Date(review.timestamp)
    const month = date.toLocaleString('default', { month: 'short' })
    return `${date.getDate()} ${month}, ${date.getFullYear()}`
  }, [review.timestamp])
  const rating = useMemo(() => {
    return Number.parseInt(review.rating) / 2
  }, [review.rating])

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-start mb-2 space-x-4">
        <img src={review.userPic} alt="user" className="object-cover rounded-md w-9 h-9" />
        <div className="text-sm">
          <h3 className="font-medium text-gray-800">{review.userName}</h3>
          <p className="text-xs text-gray-500">{review.userPost}</p>
        </div>
      </div>
      <div className="flex flex-col mb-2 space-y-2 md:space-y-0 md:flex-row md:space-x-4 md:items-center">
        <h2 className="font-medium">{review.reviewHead}</h2>
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <AiFillStar key={index} className={index <= rating - 1 ? 'text-yellow-400' : 'text-gray-200'} />
          ))}
        </div>
      </div>
      <TruncatedDescription description={review.reviewBody} className="mb-4 text-sm text-gray-500" />
      <div className="flex items-center space-x-4 text-xs font-medium text-gray-400">
        <Button icon={<FaThumbsUp />} size="small">
          Helpful
        </Button>
        <div>{review.helpedPeopleCount} people found this question helpful</div>
        <div className="hidden md:flex">{time}</div>
      </div>
    </div>
  )
}

export const ReviewCard = ReviewCardComponent
