import React from 'react'
import { SolutionListingCard } from '../../components/solution-listing-card'
import { useProfile } from '@taggedweb/hooks/use-profile'

import { Profile } from '@taggedweb/types/profile'

export default function BookmarkedSolutionsList() {
  const profile = useProfile()
  const solutionsList = profile && profile.bookmarked_solutions
  return (
    <div className="flex flex-col w-1/2 mx-auto my-8">
      <p className="mb-2 text-lg font-bold">Bookmarked Solutions</p>
      <div className="w-full mb-4 rounded-md">
        {solutionsList &&
          solutionsList.map((solution, index) => {
            if (typeof solution === 'undefined') return null
            else return <SolutionListingCard key={`bookmarked-solution-${index}`} listingData={solution.solution} />
          })}
        {!solutionsList && <div>No Bookmarked Solutions yet!!</div>}
      </div>
    </div>
  )
}
