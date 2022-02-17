/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import numeral from 'numeral'
import toast from 'react-hot-toast'
import { ServiceReview } from '@taggedweb/types/service-review'
import { addAssetReview } from '@taggedweb/queries/service'
import { TOAST_SOFTWARE_REVIEW_ADD_SUCCESS } from '@taggedweb/utils/token-id'
import { StyledStarRating } from '../styled-star-rating'
// import { MarkProgress } from '../styled-mark-progress'
import { ReviewInput } from '../review-input'
import { ReviewCard } from '../review-card'

type ServiceDetailReviewsProps = {
  assetId: number
  assetName: string
  reviews: ServiceReview[]
  avgRating: number
  reviewsCount: number
  id: string
}

function ReviewsContentComponent({
  assetId,
  assetName,
  reviews,
  avgRating,
  reviewsCount: initReviewsCount,
  id,
}: ServiceDetailReviewsProps) {
  const [sortType, setSortType] = useState('TOP_REVIEWS')
  const [viewMore, setViewMore] = useState(false)
  const [viewVideoMore, setViewVideoMore] = useState(false)
  const [reviewMark, setReviewMark] = useState(numeral(Number(avgRating ?? 0)).format('0.[0]'))
  const [reviewsCount, setReviewsCount] = useState(initReviewsCount)
  if (typeof reviews === 'undefined' || !reviews) return null

  const addReview = async (addData) => {
    const data = await addAssetReview({
      asset: assetId,
      content: addData.review,
      video_url: addData.videoUrl,
      rating: addData.avarageRate * 2,
    })
    if (data) {
      toast.success('Added an asset review successfully.', {
        id: TOAST_SOFTWARE_REVIEW_ADD_SUCCESS,
      })
      setReviewMark(numeral(Number(data.asset_avg_rating ?? 0)).format('0.[0]'))
      setReviewsCount(data.asset_reviews_count)
    }
  }

  const defaultVideoShowCount = 4
  const defaultShowCount = 2
  // const marks = [
  //   {
  //     name: 'Features',
  //     mark: 4.6,
  //   },
  //   {
  //     name: 'Ease of Use',
  //     mark: 4.5,
  //   },
  //   {
  //     name: 'Value for Mone',
  //     mark: 4.1,
  //   },
  //   {
  //     name: 'Coustomer Support',
  //     mark: 4.1,
  //   },
  // ]
  // eslint-disable-next-line array-callback-return
  reviews.sort((reviewA, reviewB) => {
    if (sortType === 'TOP_REVIEWS') return (Number(reviewA.rating) - Number(reviewB.rating)) * -1
    if (sortType === 'RECENT_REVIEWS') {
      const dateA = new Date(reviewA.created)
      const dateB = new Date(reviewB.created)
      return (dateA.getTime() - dateB.getTime()) * -1
    }
    return 0
  })
  let viewReviews = reviews
  const totalVideoReviews = reviews.filter((review) => {
    const tempUrl = review?.video_url ?? ''
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
      <a href={`#${id}`}>
        <h1 className="text-base font-medium text-text-primary">Reviews</h1>
      </a>
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
          <span className="text-lg text-primary">{reviewsCount.toLocaleString()}</span>
          <span className="px-2 text-text-tertiary">reviews</span>
        </div>
      </div>
      {/* <div className="flex flex-col md:items-center">
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
      </div> */}
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
      <ReviewInput serviceName={assetName} handleSubmit={(data) => addReview(data)} />
    </>
  )
}

export const ReviewsContent = ReviewsContentComponent
