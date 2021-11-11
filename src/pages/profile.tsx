import React, { useMemo, useEffect } from 'react'
import { Element } from 'react-scroll'
import { useProfile } from '@taggedweb/hooks/use-profile'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { Spinner } from '@taggedweb/components/spinner'
import { ProfileCard } from '@taggedweb/components/profile-card'
import { UserContextType } from '@taggedweb/types/user-context-type'
import { ProfileContextType } from '@taggedweb/types/profile-context-type'
import { withPageAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { ProfileDesktop, ProfileMobile } from '@taggedweb/components/profile'
import { Profile } from '@taggedweb/types/profile'

// const asset1 = {
//   logo_url: 'http://logo.clearbit.com/mailchimp.com',
//   short_description: 'Mailchimp helps small businesses do big things with the right tools.',
//   description:
//     'Mailchimp helps small businesses do big things, with the right tools and guidance every step of the way.\r\n\r\n* Marketing\r\n* Websites and Commerce\r\n* Transactional Emails',
//   tags: [
//     {
//       slug: 'email-marketing',
//       name: 'Email Marketing',
//     },
//     {
//       slug: 'landing-pages',
//       name: 'Landing Pages',
//     },
//     {
//       slug: 'marketing',
//       name: 'Marketing',
//     },
//   ],
//   upvotes_count: 10,
//   name: 'Mailchimp',
//   slug: 'mail-chimp',
//   id: 1,
//   has_free_trial: true,
//   reviews_count: 1000,
//   avg_rating: '8.1000',
//   users_count: 1100,
//   website: 'http://mailchimp.com/',
// } as Asset

// const asset2 = {
//   logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
//   description:
//     'Campaign Monitor is an email marketing tool that enables marketers to send beautiful and personalized emails, creating a reliable channel to grow engagement with subscribers and promote loyal readership and conversions.\r\n\r\n* Email templates\r\n* Drag-and-drop builder\r\n* Engagement-based segmentation (Allows digital marketers to deliver targeted content to lists of subscribers without any technical expertise)',
//   tags: [
//     {
//       slug: 'email-marketing',
//       name: 'Email Marketing',
//     },
//   ],
//   upvotes_count: 10,
//   name: 'Campaign Monitor',
//   slug: 'campaign-monitor',
//   id: 2,
//   has_free_trial: false,
//   reviews_count: 457,
//   avg_rating: '10.000',
//   users_count: 102,
// } as Asset

function ProfilePage() {
  const user = useUserContext()
  const profile = useProfile()
  const data = useMemo((): UserContextType & ProfileContextType => ({ ...user, ...profile }), [user, profile])

  useEffect(() => {
    const { error } = profile
    if (error) {
      // TODO: error handling
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [profile])

  if (profile.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen space-y-4">
        <Spinner className="w-8 h-8 !text-text-secondary" />
        <div className="text-sm text-text-tertiary">Loading Profile</div>
      </div>
    )
  }

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto" id="scroll-container-outer">
        <Element name={'personal-information'}>
          <ProfileCard data={data} />
        </Element>
        <ProfileDesktop profile={profile as Profile} />
        <ProfileMobile profile={profile as Profile} />
      </div>
    </div>
  )
}

export default withPageAuthRequired(ProfilePage, { message: 'You need to login to view profile.' })
