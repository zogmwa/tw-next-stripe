import React from 'react'
import { SolutionBookingCard } from '../solution-booking-card'

function SolutionBookingsProfileComponent({ data }) {
  const bookedSolutionsList = data.booked_solutions
  bookedSolutionsList.sort((questionA, questionB) => {
    const dateA = new Date(questionA.created)
    const dateB = new Date(questionB.created)
    return (dateA.getTime() - dateB.getTime()) * -1
  })
  return (
    <div id="contracts" className="mb-8">
      <p className="text-base font-bold">Contracts</p>
      <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
        {bookedSolutionsList &&
          bookedSolutionsList.map((bookedSolution, index) => {
            if (typeof bookedSolution === 'undefined') return null
            else return <SolutionBookingCard key={`contract-${index}`} solutionBookingData={bookedSolution} />
          })}
      </div>
    </div>
  )
}

export const SolutionBookingsProfileProfile = SolutionBookingsProfileComponent
