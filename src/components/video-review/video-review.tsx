import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { ServiceReview } from '../../types/service-review'

type VideoCardProps = {
    review: ServiceReview
}

function VideoReviewComponent({ review }: VideoCardProps) {
    const rating = Number.parseInt(review.rating)

    return (
        <div className="h-56 w-56 border-2 rounded shadow-sm">
            <iframe
            className="w-full mb-2 rounded max-h-32"
            src={review.videoUrl}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            />
            <div className="m-2">
                <div className="font-bold">{review.userName}</div>
                <div className="mt-2 mb-2 flex space-x-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <AiFillStar
                        key={index}
                        className={index <= rating - 1 ? 'text-yellow-400' : 'text-text-tertiary opacity-25'}
                    />
                    ))}
                </div>
                <div className="text-sm text-gray-500">{review.reviewBody}</div>
            </div>
        </div>
    )
}

export const VideoReviewCard = VideoReviewComponent
