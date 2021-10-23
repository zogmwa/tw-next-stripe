import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { FaCircle } from 'react-icons/fa'

const defaultButtonClassName =
  'self-center p-0.5 text-2xl bg-background-default rounded-full active:scale-95 transition-all hover:bg-background-dark'

export function ProductContentCarouselSkeleton() {
  return (
    <div className="w-full mt-2 space-y-6 text-text-secondary">
      <div className="flex items-center space-x-4">
        <button className={defaultButtonClassName}>
          <HiChevronLeft />
        </button>
        <div className="w-full overflow-hidden border rounded-lg border-border-default bg-background-light">
          <div className="aspect-h-9 aspect-w-16" />
        </div>
        <button className={defaultButtonClassName}>
          <HiChevronRight />
        </button>
      </div>
      <div className="flex justify-center mx-auto space-x-4 max-w-max">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <button className="text-[8px] rounded-full transition-colors" key={index}>
              <FaCircle />
            </button>
          ))}
      </div>
    </div>
  )
}
