import React from 'react'
import Link from 'next/link'

export const BookmarkedSolutionsProfile = ({ data }) => {
  return (
    <Link href="/profile/bookmarked-solutions">
      <a>
        <div id="bookmarked-solutions" className="flex mb-8 border-b border-gray-300 cursor-pointer">
          <p className="text-sm font-bold sm:text-base hover:text-blue-500">Bookmarked Solutions</p>
          <span className="ml-auto text-sm sm:text-base">{`${
            (data?.bookmarked_solutions && data?.bookmarked_solutions.length) ?? 0
          } Product(s)`}</span>
        </div>
      </a>
    </Link>
  )
}
