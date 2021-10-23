import React from 'react'
import { Link } from 'react-scroll'
import { Profile } from '../../types/profile'
import { PendingAssetsProfile } from './pending-assets'
import { PublishedAssetsProfile } from './published-assets'
function ScrollSpy({ elements }) {
  return (
    <div className="flex-shrink-0 w-48">
      <nav className="sticky left-0 right-0 p-2 bg-white border border-solid rounded-md shadow top-4 border-grey-200">
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
    </div>
  )
}

const elements = [
  {
    id: 'personal-information',
    name: 'Personal Information',
  },
  {
    id: 'pending-assets',
    name: 'Pending Assets',
  },
  {
    id: 'published-assets',
    name: 'Published Assets',
  },
]

export const ProfileDesktop = ({ profile }: { profile: Profile }) => {
  return (
    <div className="hidden md:flex">
      <ScrollSpy elements={elements} />
      <div id="scroll-container-inner" className="flex-grow ml-6">
        <PendingAssetsProfile data={profile} />
        <PublishedAssetsProfile data={profile} />
      </div>
    </div>
  )
}
