import React from 'react'
import { Link } from 'react-scroll'

export function ScrollSpy({ elements }) {
  return (
    <div className="w-48">
      <nav className="sticky w-48 p-2 bg-white border border-solid rounded-md shadow top-4 border-grey-200">
        {elements.map((item) => (
          <Link
            activeClass="bg-secondary text-primary font-semibold rounded-sm"
            className="block mx-1 my-0.5 px-1 py-0.5 text-text-secondary font-sm cursor-pointer"
            to={item.id}
            spy={true}
            smooth={true}
            duration={300}
            key={item.id}
          >
            <a>{item.name}</a>
          </Link>
        ))}
      </nav>
    </div>
  )
}
