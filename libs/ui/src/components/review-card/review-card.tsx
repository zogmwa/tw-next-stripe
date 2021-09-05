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
      <div className="flex items-center justify-start space-x-4">
        <img src={review.userPic} alt="user" className="w-20 rounded-md" />
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{review.userName}</h3>
          <p className="Text-gray-500">{review.userPost}</p>
        </div>
      </div>
      <div className="flex flex-col mt-2 space-y-2 md:flex-row md:space-x-4">
        <h2 className="text-xl font-bold">{review.reviewHead}</h2>
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => <AiFillStar key={index} className={index <= rating - 1 ? 'text-yellow-400' : 'text-gray-200' } />)}
        </div>
      </div>
      <div className="hidden my-4 md:flex">
        <p>{review.reviewBody}</p>
      </div>
      <div className="my-3 md:hidden">
        <TruncatedDescription description={review.reviewBody}/>
      </div>
      <div className="flex items-center space-x-8">
        <Button icon={<FaThumbsUp/>}>Helpful</Button>
        <div className="text-lg font-semibold text-gray-400">{review.helpedPeopleCount} people found this question helpful</div>
        <div className="hidden md:flex">
          <div className="text-lg font-semibold text-gray-400">{time}</div>
        </div>
      </div>
    </div>
  )
}

export const ReviewCard = ReviewCardComponent
