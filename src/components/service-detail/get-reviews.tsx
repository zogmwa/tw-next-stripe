import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { ReviewsContent } from './reviews-content'
import { fetchVote } from '../../queries/service'

function GetReviewsComponent({ assetId, assetName, avgRating, reviewsCount }) {
  const { query } = useRouter()
  const { slug } = query as { slug: string }
  const [data, setData] = useState(null)

  const {
    isLoading, // eslint-disable-line @typescript-eslint/no-unused-vars
    data: queryData,
    error, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useQuery(['services', `asset_reviews?asset__slug=${slug}`], () => fetchVote(slug), {
    enabled: true,
  })
  useEffect(() => {
    if (queryData) {
      setData(queryData)
    }
  }, [queryData])

  return (
    <ReviewsContent
      assetId={assetId}
      assetName={assetName}
      reviews={data}
      avgRating={avgRating}
      reviewsCount={reviewsCount}
    />
  )
}

export const ReviewsContainer = GetReviewsComponent
