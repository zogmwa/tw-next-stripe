import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchVote } from '@taggedweb/queries/service'
import { ReviewsContent } from './reviews-content'

function GetReviewsComponent({ assetId, assetName, avgRating, reviewsCount, id }) {
  const { query } = useRouter()
  const { slug } = query as { slug: string }
  const [data, setData] = useState(null)

  const {
    isLoading, // eslint-disable-line @typescript-eslint/no-unused-vars
    data: queryData,
    error, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useQuery(['services', `asset_reviews?asset__slug=${slug}`], () => fetchVote(slug), {
    enabled: true,
    refetchOnWindowFocus: false,
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
      id={id}
    />
  )
}

export const ReviewsContainer = GetReviewsComponent
