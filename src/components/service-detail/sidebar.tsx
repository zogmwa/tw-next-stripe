import React from 'react'
import ScrollableLink from './scrollable-link'

function ServiceDetailSidebarComponent({ elements }) {
  return (
    <div className="hidden md:flex">
      <div className="flex w-48">
        <nav className="sticky top-0 w-48 p-2 bg-white border border-solid rounded-md shadow h-44 border-grey-200">
          {elements.map((item) => (
            <ScrollableLink
              href={`#scrollable-${item.id}`}
              key={item.id}
              activeClassName={'bg-secondary text-primary border-secondary font-semibold rounded-sm'}
            >
              <a
                className="block mx-1 my-0.5 px-1 py-0.5 text-sm text-text-secondary font-sm cursor-pointer focus:ring-0 focus:ring-offset-0"
                href={`#scrollable-${item.id}`}
              >
                {item.name}
              </a>
            </ScrollableLink>
          ))}
        </nav>
      </div>
      <div className="w-full ml-4">
        <div id="scroll-element" className="my-2 ml-4">
          {elements.map((item) => (
            <div id={`scrollable-${item.id}`} key={item.id} style={{ scrollMarginTop: '4rem' }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const ServiceDetailSidebar = ServiceDetailSidebarComponent
