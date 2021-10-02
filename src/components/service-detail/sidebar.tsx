import React from 'react'
import { ScrollSpy } from '../scrollspy'

function ServiceDetailSidebarComponent({ elements }) {
  return (
    <div className="hidden md:flex">
      <ScrollSpy elements={elements} />
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
