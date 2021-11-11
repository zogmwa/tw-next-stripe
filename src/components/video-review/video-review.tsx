import React from 'react'
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { ServiceReview } from '@taggedweb/types/service-review'
import { StyledStarRating } from '../styled-star-rating'

type VideoCardProps = {
  review: ServiceReview
  className?: string
}

function VideoReviewComponent({ review, className }: VideoCardProps) {
  return (
    <div className={`flex flex-col h-56 w-72 border-2 rounded shadow-sm ${className}`}>
      <iframe
        className="w-full mb-2 rounded max-h-32"
        src={review.video_url}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
      <div className="mx-2">
        <div className="font-bold">{review.user.username}</div>
        <StyledStarRating
          name={review.video_url}
          className="mt-1 space-x-1"
          defaultValue={Math.ceil(Number(review.rating)) / 2}
          precision={0.5}
          size="1rem"
          readOnly={true}
        />
      </div>
      <ReactMarkdown remarkPlugins={[gfm]} className="inline-block ml-2 text-sm text-gray-500">
        {`"${review.content.substring(0, 15)}..."`}
      </ReactMarkdown>
    </div>
  )
}

export const VideoReviewCard = VideoReviewComponent
