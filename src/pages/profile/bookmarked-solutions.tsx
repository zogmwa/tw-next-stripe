import React from 'react'
import { SolutionListingCard } from '../../components/solution-listing-card'
import { useProfile } from '@taggedweb/hooks/use-profile'
import { Profile } from '@taggedweb/types/profile'

export default function BookmarkedSolutionsList() {
  const profile = useProfile()
  const solutionsList = profile && profile.bookmarked_solutions

  return (
    <div className="flex flex-col w-3/4 mx-auto xl:w-1/2 my-4 lg:my-8 min-h-[50%]">
      <p className="mb-2 text-lg font-bold">Bookmarked Solutions</p>
      <div className="w-full mb-4">
        {solutionsList && solutionsList.length == 0 && (
          <p className="text-center">
            No Bookmarked Solutions yet... Explore some solutions{' '}
            <a href="/" className="underline">
              here
            </a>
          </p>
        )}
        {solutionsList &&
          solutionsList.map((solution, index) => {
            if (typeof solution === 'undefined') return null
            else return <SolutionListingCard key={`bookmarked-solution-${index}`} listingData={solution.solution} />
          })}
      </div>
    </div>
  )
}
