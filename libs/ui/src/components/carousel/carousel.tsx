import clsx from 'clsx'
import React, { Children, useState, ReactNode } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { FaCircle } from 'react-icons/fa'
import { CarouselItem } from './carousel-item'

type CarouselProps = {
  className?: string
  buttonClassName?: string
  itemsContainerClassName?: string
  initialIndex?: number
  currentIndex?: number
  onCurrentIndexChange?: (index: number) => void
  buttonsShown?: boolean
  indicatorShown?: boolean
  children?: ReactNode
}

const defaultButtonClassName =
  'self-center p-0.5 text-2xl bg-gray-100 rounded-full active:scale-95 transition-all hover:bg-gray-200'

function CarouselComponent({
  className,
  buttonClassName,
  itemsContainerClassName,
  initialIndex = 0,
  currentIndex: outerIndex,
  onCurrentIndexChange,
  buttonsShown = true,
  indicatorShown = true,
  children,
}: CarouselProps) {
  const [innerIndex, setInnerIndex] = useState(initialIndex)
  const currentIndex = outerIndex ?? innerIndex
  const isControlled = outerIndex !== undefined
  const items = Children.toArray(children)
  const currentItem = items[currentIndex]

  function setCurrentIndex(index: number) {
    if (!isControlled) {
      setInnerIndex(index)
    }
    onCurrentIndexChange && onCurrentIndexChange(index)
  }

  function nextImage() {
    setCurrentIndex((currentIndex + 1) % items.length)
  }

  function prevImage() {
    setCurrentIndex(currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1)
  }

  return (
    <div className={clsx('space-y-6 text-gray-600', className)}>
      <div className="flex items-center space-x-4">
        {buttonsShown && (
          <button className={clsx(defaultButtonClassName, buttonClassName)} onClick={prevImage}>
            <HiChevronLeft />
          </button>
        )}
        <div
          className={clsx(
            'w-full overflow-hidden border border-gray-200 rounded-lg bg-gray-50',
            itemsContainerClassName,
          )}
        >
          {currentItem}
        </div>
        {buttonsShown && (
          <button className={clsx(defaultButtonClassName, buttonClassName)} onClick={nextImage}>
            <HiChevronRight />
          </button>
        )}
      </div>
      {indicatorShown && (
        <div className="flex justify-center mx-auto space-x-4 max-w-max">
          {Array(items.length)
            .fill(null)
            .map((_, index) => (
              <button
                className={clsx(
                  'text-[8px] rounded-full transition-colors',
                  index === currentIndex ? 'text-gray-700' : 'text-gray-300',
                )}
                key={index}
                onClick={() => setCurrentIndex(index)}
              >
                <FaCircle />
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export const Carousel = Object.assign(CarouselComponent, {
  Item: CarouselItem,
})
