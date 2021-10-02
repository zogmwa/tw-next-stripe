import React, { useMemo } from 'react'
// import { ScrollSpy } from '../components/scrollspy'
import { useProfileContext } from '../hooks/use-profile'
import { useUserContext } from '../hooks/use-user'
import { Spinner } from '../components/spinner'
import { ProfileAsset, ProfileCard } from '../components/profile'
import { UserContextType } from '../types/user-context-type'
import { ProfileContextType } from '../types/profile-context-type'
import { Asset } from '../types/asset'
import { Link, Element } from 'react-scroll'

function ScrollSpy({ elements }) {
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
            // containerId={item.containerId}
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
    containerId: 'scroll-container-outer',
  },
  {
    id: 'pending-assets',
    name: 'Pending Assets',
    containerId: 'scroll-container-inner',
  },
  {
    id: 'published-assets',
    name: 'Published Assets',
    containerId: 'scroll-container-inner',
  },
]

const asset1 = {
  logo_url: 'http://logo.clearbit.com/mailchimp.com',
  short_description: 'Mailchimp helps small businesses do big things with the right tools.',
  description:
    'Mailchimp helps small businesses do big things, with the right tools and guidance every step of the way.\r\n\r\n* Marketing\r\n* Websites and Commerce\r\n* Transactional Emails',
  tags: [
    {
      slug: 'email-marketing',
      name: 'Email Marketing',
    },
    {
      slug: 'landing-pages',
      name: 'Landing Pages',
    },
    {
      slug: 'marketing',
      name: 'Marketing',
    },
  ],
  upvotes_count: 10,
  name: 'Mailchimp',
  slug: 'mail-chimp',
  id: 1,
  has_free_trial: true,
  reviews_count: 1000,
  avg_rating: '8.1000',
  users_count: 1100,
  website: 'http://mailchimp.com/',
} as Asset
const asset2 = {
  logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
  description:
    'Campaign Monitor is an email marketing tool that enables marketers to send beautiful and personalized emails, creating a reliable channel to grow engagement with subscribers and promote loyal readership and conversions.\r\n\r\n* Email templates\r\n* Drag-and-drop builder\r\n* Engagement-based segmentation (Allows digital marketers to deliver targeted content to lists of subscribers without any technical expertise)',
  tags: [
    {
      slug: 'email-marketing',
      name: 'Email Marketing',
    },
  ],
  upvotes_count: 10,
  name: 'Campaign Monitor',
  slug: 'campaign-monitor',
  id: 2,
  has_free_trial: false,
  reviews_count: 457,
  avg_rating: '10.000',
  users_count: 102,
} as Asset

// TODO: change functions to filter published and pending assets
const isPublished: (asset: Asset) => boolean = (asset) => true
const isPending: (asset: Asset) => boolean = (asset) => true

export default function Profile() {
  const user = useUserContext()
  const profile = useProfileContext()
  const data = useMemo((): UserContextType & ProfileContextType => ({ ...user, ...profile }), [user, profile])
  const loading: boolean = !user.userFetched || !profile.profileFetched

  // const publishedAssets: Asset[] = data.submittedAssets.filter(isPublished)
  // const pendingAssets: Asset[] = data.submittedAssets.filter(isPending)
  const publishedAssets: Asset[] = [asset1, asset2]
  const pendingAssets: Asset[] = [asset1, asset2]

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
        <Spinner className="w-8 h-8 !text-text-secondary" />
        <div className="text-sm text-text-tertiary">Loading Profile</div>
      </div>
    )

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto" id="scroll-container-outer">
        <Element name={'personal-information'}>
          <ProfileCard data={data} />
        </Element>
        <div className="hidden md:flex">
          <ScrollSpy elements={elements} />
          <div id="scroll-container-inner" className="flex-grow ml-6">
            <div id="pending-assets" className="mb-8">
              <div className="flex mb-2">
                <p className="text-base font-bold">Pending Assets</p>
                <span className="ml-auto">{`${pendingAssets.length} Product(s)`}</span>
              </div>
              <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                {pendingAssets.map((asset) => (
                  <ProfileAsset asset={asset} key={asset.id} />
                ))}
              </div>
            </div>
            <div id="published-assets" className="mb-8">
              <div className="flex mb-2">
                <p className="text-base font-bold">Published Assets</p>
                <span className="ml-auto">{`${publishedAssets.length} Product(s)`}</span>
              </div>
              <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                {publishedAssets.map((asset) => (
                  <ProfileAsset asset={asset} key={asset.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
