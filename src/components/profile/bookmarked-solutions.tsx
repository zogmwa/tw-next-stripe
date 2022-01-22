import React from 'react'
import Link from 'next/link'

export const BookmarkedSolutionsProfile = ({ data }) => {
  return (
    <Link href="/profile/bookmarked-solutions">
      <a>
        <div id="bookmarked-solutions" className="mb-8 border-b border-gray-300 cursor-pointer md:flex">
          <p className="text-base font-bold hover:text-blue-500">Bookmarked Solutions</p>
          <span className="ml-auto">{`${
            (data?.bookmarked_solutions && data?.bookmarked_solutions.length) ?? 0
          } Product(s)`}</span>
        </div>
      </a>
    </Link>
  )
}
