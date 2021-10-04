import React, { useState } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { StyledStarRating } from '../styled-star-rating'
import { MarkProgress } from '../styled-mark-progress'
import { ReviewInput } from '../review-input'
import { ReviewCard } from '../review-card'
import { Asset } from '../../types/asset'

type ServiceDetailReviewsProps = {
  service: Asset
}

function ReviewsContentComponent({ service }: ServiceDetailReviewsProps) {
  const [sortType, setSortType] = useState('TOP_REVIEWS')
  const [viewMore, setViewMore] = useState(false)
  if (typeof service === 'undefined') return null

  const reviews = [
    {
      userPic: 'http://logo.clearbit.com/mailchimp.com',
      userName: 'Becky Howard',
      userPost: 'Product Manger',
      userCompany: 'XYZABC Corp.',
      reviewTitle: 'Good quality video and rich features',
      reviewBody:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      created_at: '2021-08-27T16:34:08.984019Z',
      helpedPeopleCount: '10',
      rating: '8',
    },
    {
      userPic: 'http://logo.clearbit.com/mailchimp.com',
      userName: 'Leah Andreson',
      userPost: 'Product Manger',
      userCompany: 'XYZABC Corp.',
      reviewTitle: 'Good quality video and rich features',
      reviewBody:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      created_at: '2021-08-29T16:34:08.984019Z',
      helpedPeopleCount: '10',
      rating: '7',
    },
    {
      userPic: 'http://logo.clearbit.com/mailchimp.com',
      userName: 'Test account',
      userPost: 'Product Manger',
      userCompany: 'XYZABC Corp.',
      reviewTitle: 'Good quality video and rich features',
      reviewBody:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      created_at: '2021-08-28T16:34:08.984019Z',
      helpedPeopleCount: '10',
      rating: '9',
    },
  ]
  const defaultShowCount = 2
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
      let dateA = new Date(reviewA.created_at)
      let dateB = new Date(reviewB.created_at)
      return (dateA.getTime() - dateB.getTime()) * -1
    }
  })
  let viewReviews = reviews
  if (!viewMore) {
    viewReviews = reviews.slice(0, 2)
  }

  return (
    <>
      <h1 className="text-base font-medium text-text-primary">Reviews</h1>
      <div className="flex flex-col items-center">
        <StyledStarRating
          name="default"
          defaultValue={Math.ceil(reviewMark) / 2}
          precision={0.5}
          size="3rem"
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
            height={15}
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
      {viewReviews.length > defaultShowCount && viewMore ? (
        <div
          className="flex self-start w-full px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
          onClick={() => setViewMore(false)}
        >
          Load Less Answered questions
          <HiChevronUp className="self-center ml-2 text-text-tertiary" />
        </div>
      ) : (
        <div
          className="flex self-start w-full px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
          onClick={() => setViewMore(true)}
        >
          Load More Answered questions
          <HiChevronDown className="self-center ml-2 text-text-tertiary" />
        </div>
      )}
      <ReviewInput serviceName="Zoom" onSubmit={(event) => console.log('onSubmit Event:', event)} />
    </>
  )
}

export const ReviewsContent = ReviewsContentComponent
