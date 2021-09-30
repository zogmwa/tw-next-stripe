import { Link, Element } from 'react-scroll'
import React from 'react'

const elements = [
  {
    id: 'products',
    name: 'Product Information',
    tag: <div>Products Element.</div>,
  },
  {
    id: 'features',
    name: 'Features',
    tag: <div>Features Element.</div>,
  },
  {
    id: 'pricing',
    name: 'Pricing',
    tag: <div>Pricing Element.</div>,
  },
  {
    id: 'qa',
    name: 'Q & A',
    tag: <div>Q & A Element.</div>,
  },
  {
    id: 'reviews',
    name: 'Reviews',
    tag: <div>Reviews Element.</div>,
  },
  {
    id: 'related',
    name: 'Related',
    tag: <div>Related Element.</div>,
  },
]

function ServiceDetailSidebarComponent() {
  return (
    <>
      <nav className="fixed p-2 border border-solid rounded-md shadow min-w-48 border-grey-200">
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
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="my-2 ml-48 mr-1">
        {elements.map((item) => (
          <Element name={item.id} key={item.id} style={{ height: 600 }}>
            {item.tag}
          </Element>
        ))}
      </div>
    </>
  )
}

export const ServiceDetailSidebar = ServiceDetailSidebarComponent
