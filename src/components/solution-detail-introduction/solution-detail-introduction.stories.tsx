import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionDetailIntroduction } from '.'

export default {
  title: 'General/SolutionDetailIntroduction',
  component: SolutionDetailIntroduction,
} as Meta

const introductionData = {
  tag: {
    name: 'Integrations',
    slug: 'integrations',
  },
  title: 'Improving application performance with APM, metrics and monitoring',
  upvoted_count: 324,
  users_count: 1100,
  provide_organization: {
    name: 'Solution Provider Organization',
    logo_url: null,
    website: null,
  },
  overview_description:
    'A product is a tangible item that is put on the market for acquisition, attention, or consumption, while a service is an intangible item, which arises from the output of one or more individuals. Although it seems like the main distinction between the two concepts is founded on their tangibility, that is not always the case. In most cases services are intangible, but products are not always tangible. ZOOM Cloud Meetings is an intelligently engineered video conference software that can help you arrange video meetings, conferences, and video webinars from a remote location. It can build collaboration-enabled conference rooms.',
  scope_of_work_description:
    'A product is a tangible item that is put on the market for acquisition, attention, or consumption, while a service is an intangible item, which arises from the output of one or more individuals. Although it seems like the main distinction between the two concepts is founded on their tangibility, that is not always the case. In most cases services are intangible, but products are not always tangible.',
}

export function DefaultSolutionDetailIntroduction() {
  return <SolutionDetailIntroduction introductionData={introductionData} />
}
