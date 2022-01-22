import React, { useState } from 'react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { SolutionListingCard } from '../solution-listing-card'

function SolutionListComponent({ solutions }) {
  const defaultShowCount = 2
  const [isShowMore, setIsShowMore] = useState(false)

  let showSolutionsList = solutions
  if (!isShowMore) showSolutionsList = solutions.slice(0, defaultShowCount)

  return (
    <>
      {showSolutionsList.map((solution, key) => (
        <SolutionListingCard key={`desktopSeviceList${key}`} listingData={solution} show_price={false} />
      ))}
      {solutions.length > defaultShowCount &&
        (isShowMore ? (
          <div
            className="flex self-start w-full px-0 mt-4 mb-4 ml-2 text-xs border-0 cursor-pointer text-text-secondary"
            onClick={() => setIsShowMore(false)}
          >
            Show Less
            <HiChevronUp className="self-center ml-2 text-text-tertiary" />
          </div>
        ) : (
          <div
            className="flex self-start w-full px-0 mt-4 mb-4 ml-2 text-xs border-0 cursor-pointer text-text-secondary"
            onClick={() => setIsShowMore(true)}
          >
            Show More
            <HiChevronDown className="self-center ml-2 text-text-tertiary" />
          </div>
        ))}
    </>
  )
}

export const SolutionList = SolutionListComponent
