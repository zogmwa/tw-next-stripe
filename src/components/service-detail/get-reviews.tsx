import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { ReviewsContent } from './reviews-content'
import { fetchVote } from '../../queries/service'

function GetReviewsComponent() {
  const { query } = useRouter()
  const { slug } = query as { slug: string }
  const [data, setData] = useState(null)

  const {
    isLoading, // eslint-disable-line @typescript-eslint/no-unused-vars
    data: queryData,
    error, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useQuery(['services', `asset_reviews?asset=${slug}`], () => fetchVote(`asset_reviews?asset__slug=${slug}`), {
    enabled: true,
  })
  useEffect(() => {
    if (typeof queryData === 'undefined') {
      setData(queryData)
    }
  }, [queryData])

  return <ReviewsContent reviews={data} />
}

export const ReviewsContainer = GetReviewsComponent
