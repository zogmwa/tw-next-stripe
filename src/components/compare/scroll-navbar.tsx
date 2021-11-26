import React from 'react'
import ScrollableLink from '../scrollspy/scrollable-link'
// className='flex-1 px-1 py-2 text-sm font-medium text-gray-900 border-b-2 border-transparent whitespace-nowrap focus:outline-none focus:ring-0 focus:ring-offset-0 min-w-min'

function CompareServiceScrollNavbarComponent({ elements }) {
  return (
    <div className="hidden mt-10 md:block">
      <div className="sticky z-10 bg-white border-b border-gray-200 top-14">
        <div className="flex px-4 -mb-px space-x-8 overflow-x-auto">
          {elements.map((item) => (
            <ScrollableLink
              href={`#scrollable-${item.id}`}
              key={`service-compare-tablist-${item.id}`}
              activeClassName="text-primary border-primary"
              replaceClassName="text-gray-900 border-transparent"
            >
              <span className="flex-1 px-1 py-2 text-sm font-medium text-center border-b-2 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-0 focus:ring-offset-0 min-w-min">
                {item.name}
              </span>
            </ScrollableLink>
          ))}
        </div>
      </div>
      <div className="scroll">
        <div id="scroll-element" className="pt-4 pb-8 space-y-10">
          {elements.map((item) => (
            <div id={`scrollable-${item.id}`} key={item.id} style={{ scrollMarginTop: '6rem' }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const CompareServiceScrollNavbar = CompareServiceScrollNavbarComponent
