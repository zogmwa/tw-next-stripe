import React, { useState } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { StyledStarRating } from '../styled-star-rating'
import { MarkProgress } from '../styled-mark-progress'
import { ReviewInput } from '../review-input'
import { ReviewCard } from '../review-card'
import { ServiceReview } from '../../types/service-review'
import { VideoReviewCard } from '../video-review'

type ServiceDetailReviewsProps = {
  reviews: ServiceReview[]
}

function ReviewsContentComponent({ reviews }: ServiceDetailReviewsProps) {
  const [sortType, setSortType] = useState('TOP_REVIEWS')
  const [viewMore, setViewMore] = useState(false)
  const [viewVideoMore, setViewVideoMore] = useState(false)
  if (typeof reviews === 'undefined' || !reviews) return null

  const defaultShowCount = 2
  const defaultVideoShowCount = 4
  const reviewMark = 8.1
  const totalReviews = 3400
  const marks = [
    {
      name: 'Features',
      mark: 4.6,
    },
    {
      name: 'Ease of Use',
      mark: 4.5,
    },
    {
      name: 'Value for Mone',
      mark: 4.1,
    },
    {
      name: 'Coustomer Support',
      mark: 4.1,
    },
  ]
  reviews.sort((reviewA, reviewB) => {
    if (sortType === 'TOP_REVIEWS') return (Number(reviewA.rating) - Number(reviewB.rating)) * -1
    if (sortType === 'RECENT_REVIEWS') {
      let dateA = new Date(reviewA.created)
      let dateB = new Date(reviewB.created)
      return (dateA.getTime() - dateB.getTime()) * -1
    }
  })
  let viewReviews = reviews
  let totalVideoReviews = reviews.filter(review => {
    let tempUrl = review?.video_url ?? ''
    if (tempUrl.length > 0) return true
    else return false
  })
  let viewVideoReviews = totalVideoReviews
  if (!viewMore) {
    viewReviews = reviews.slice(0, 2)
  }
  if (!viewVideoMore) {
    viewVideoReviews = totalVideoReviews.slice(0, 4)
  }

  return (
    <>
      <h1 className="text-base font-medium text-text-primary">Reviews</h1>
      <div className="flex flex-col items-center">
        <StyledStarRating
          name="default"
          className="space-x-2"
          defaultValue={Math.ceil(reviewMark) / 2}
          precision={0.5}
          size="2.5rem"
          readOnly={true}
        />
        <div className="flex items-end mt-2">
          <span className="text-3xl font-semibold">{reviewMark}</span>
          <span className="px-2 text-text-tertiary">/</span>
          <span className="text-text-tertiary">10</span>
        </div>
        <div className="flex items-end mt-2">
          <span className="text-lg text-primary">{totalReviews.toLocaleString()}</span>
          <span className="px-2 text-text-tertiary">reviews</span>
        </div>
      </div>
      <div className="flex flex-col md:items-center">
        {marks.map((item, index) => (
          <MarkProgress
            key={index}
            className="mt-2 md:min-w-min"
            labelClassName="md:w-80 w-56"
            progressClassName="w-full"
            markClassName="md:min-w-min w-20"
            mark={item.mark}
            topMark={5}
            height={12}
            label={item.name}
          />
        ))}
      </div>
      <div className="flex justify-center mt-2 md:justify-start">
        <div className="flex px-1 py-1 rounded-md bg-background-default">
          <div
            className={
              sortType === 'TOP_REVIEWS'
                ? 'px-2 py-1 text-sm bg-white rounded-md cursor-pointer'
                : 'px-2 py-1 text-sm rounded-md cursor-pointer'
            }
            onClick={() => setSortType('TOP_REVIEWS')}
          >
            Top Reviews
          </div>
          <div
            className={
              sortType === 'RECENT_REVIEWS'
                ? 'px-2 py-1 text-sm bg-white rounded-md cursor-pointer'
                : 'px-2 py-1 text-sm rounded-md cursor-pointer'
            }
            onClick={() => setSortType('RECENT_REVIEWS')}
          >
            Recent Reviews
          </div>
        </div>
      </div>
      {viewReviews.map((review, index) => (
        <ReviewCard key={index} className="mt-2" review={review} />
      ))}
      {reviews.length > defaultShowCount ? (
        viewMore ? (
          <div
            className="flex self-start px-0 mt-2 text-sm border-0 cursor-pointer w-44 text-text-tertiary"
            onClick={() => setViewMore(false)}
          >
            Load Less reviews
            <HiChevronUp className="self-center ml-2 text-text-tertiary" />
          </div>
        ) : (
          <div
            className="flex self-start px-0 mt-2 text-sm border-0 cursor-pointer w-44 text-text-tertiary"
            onClick={() => setViewMore(true)}
          >
            Load More reviews
            <HiChevronDown className="self-center ml-2 text-text-tertiary" />
          </div>
        )
      ) : null}
      <ReviewInput serviceName="Zoom" onSubmit={(event) => console.log('onSubmit Event:', event)} />
      <h1 className="mt-2 text-base font-medium text-text-primary">Video Reviews</h1>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {viewVideoReviews.map((review, index) => (
          <VideoReviewCard review={review} className="mt-1 mr-1" key={index} />
        ))}
      </div>
      {totalVideoReviews.length > defaultVideoShowCount ? (
        viewVideoMore ? (
          <div
            className="flex self-start w-48 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
            onClick={() => setViewVideoMore(false)}
          >
            Load Less Video Reviews
            <HiChevronUp className="self-center ml-2 text-text-tertiary" />
          </div>
        ) : (
          <div
            className="flex self-start w-48 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
            onClick={() => setViewVideoMore(true)}
          >
            Load More Video Reviews
            <HiChevronDown className="self-center ml-2 text-text-tertiary" />
          </div>
        )
      ) : null}
    </>
  )
}

export const ReviewsContent = ReviewsContentComponent
