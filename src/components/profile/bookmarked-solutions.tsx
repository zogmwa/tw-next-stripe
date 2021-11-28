import React from 'react'
import { SolutionListingCard } from '../solution-listing-card'

export const BookmarkedSolutionsProfile = ({ data }) => {
  const solutionsList = data.bookmarked_solutions

  return (
    <div id="bookmarked-solutions" className="mb-8">
      <p className="text-base font-bold">Bookmarked Solutions</p>
      <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
        {solutionsList.map((solution, index) => {
          if (typeof solution === 'undefined') return null
          else return <SolutionListingCard key={`bookmarked-solution-${index}`} listingData={solution.solution} />
        })}
      </div>
    </div>
  )
}
