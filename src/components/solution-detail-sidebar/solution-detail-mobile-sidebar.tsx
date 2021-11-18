import React, { useState } from 'react'
import clsx from 'clsx'
import { BiDollar } from 'react-icons/bi'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { Button } from '../button'

type SolutionDetailMobileSidebarComponentProps = {
  detailInfo: { price: number; features: { name: string }[] }
  className?: string
}

function SolutionDetailMobileSidebarComponent({
  detailInfo,
  className = '',
}: SolutionDetailMobileSidebarComponentProps) {
  const [isShowMore, setIsShowMore] = useState(false)
  const defaultShowCount = 2

  let showFeatureList = detailInfo.features
  if (!isShowMore) showFeatureList = detailInfo.features.slice(0, defaultShowCount)

  return (
    <div className={clsx('p-2 flex justify-between', className)}>
      <div className="flex flex-col">
        <div className="flex items-center py-2">
          <BiDollar className="text-3xl font-bold text-text-primary" />
          <h4 className="text-3xl font-bold text-text-primary">{detailInfo.price}</h4>
        </div>
        <div className="flex flex-col p-2 space-y-2">
          {showFeatureList.map((feature, index) => (
            <div key={index}>
              <IoIosCheckmarkCircleOutline className="inline text-md text-primary" />
              <span className="inline pl-2 text-sm text-text-secondary">{feature.name}</span>
            </div>
          ))}
          {showFeatureList.length > 0 &&
            (isShowMore ? (
              <div
                className="flex self-start w-full px-0 mt-4 text-xs border-0 cursor-pointer text-text-secondary"
                onClick={() => setIsShowMore(false)}
              >
                Show Less
                <HiChevronUp className="self-center ml-2 text-text-tertiary" />
              </div>
            ) : (
              <div
                className="flex self-start w-full px-0 mt-4 text-xs border-0 cursor-pointer text-text-secondary"
                onClick={() => setIsShowMore(true)}
              >
                Show More
                <HiChevronDown className="self-center ml-2 text-text-tertiary" />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Button className="px-[0.5rem] mt-2 bg-primary" textClassName="text-white text-xs">
          Purchase Now
        </Button>
        <Button className="px-[0.5rem] mt-2" textClassName="text-xs">
          Ask Questions
        </Button>
      </div>
    </div>
  )
}

export const SolutionDetailMobileSidebar = SolutionDetailMobileSidebarComponent