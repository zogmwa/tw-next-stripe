import React, { useState } from 'react'
import clsx, { ClassValue } from 'clsx'
import { AiFillStar } from 'react-icons/ai'
type StarRatingProps = {
  totalStars?: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: ClassValue
  onRatingChange: (arg0: number) => void
}

const SIZES = {
  lg: 'text-2xl',
  md: 'text-xl',
  sm: 'text-lg',
}

function StarRatingComponent({ totalStars = 5, label = '', className, size = 'md', onRatingChange }: StarRatingProps) {
  const [rating, setRating] = useState(0)
  const [selectedStars, setSelectedStars] = useState(0)

  return (
    <div className="flex items-center">
      {label !== '' && (
        <div className="mr-3">
          {label}
          {': '}
        </div>
      )}
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <label
            key={index}
            className={clsx(className, SIZES[size])}
            onMouseEnter={() => setSelectedStars(ratingValue)}
            onMouseLeave={() => setSelectedStars(rating)}
          >
            <input
              type="radio"
              className="hidden"
              value={ratingValue}
              onChange={() => {
                setRating(ratingValue)
                setSelectedStars(ratingValue)
                onRatingChange(ratingValue)
              }}
            />
            <AiFillStar
              className={clsx(
                'mr-3',
                ratingValue <= selectedStars ? 'text-yellow-400 cursor-pointer' : 'text-text-tertiary opacity-25',
              )}
            />
          </label>
        )
      })}
    </div>
  )
}

export const StarRating = StarRatingComponent
