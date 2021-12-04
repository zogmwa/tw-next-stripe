import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionDetailIntroduction } from '.'

export default {
  title: 'General/SolutionDetailIntroduction',
  component: SolutionDetailIntroduction,
} as Meta

const introductionData = {
  id: 1,
  slug: 'test',
  assets: [
    {
      id: 1,
      slug: 'mailchimp',
      name: 'Mailchimp',
      logo_url: 'http://logo.clearbit.com/mailchimp.com',
      logo: null,
      website: 'http://mailchimp.com/',
    },
    {
      id: 2,
      slug: 'test',
      name: 'Test',
      logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
      logo: null,
      website: null,
    },
    {
      id: 3,
      slug: 'Test1',
      name: 'test1',
      logo_url:
        'https://uploads-ssl.webflow.com/616ec74e8792443f1fa65777/61770851a4e37b287caf6c31_Intropages_LOGO_final-02-p-500.png',
      logo: null,
      website: null,
    },
    {
      id: 4,
      slug: 'test2',
      name: 'Test2',
      logo_url: 'https://logo.clearbit.com/clockify.me',
      logo: null,
      website: null,
    },
  ],
  tag: {
    name: 'Integrations',
    slug: 'integrations',
  },
  title: 'Improving application performance with APM, metrics and monitoring',
  upvoted_count: 324,
  booked_count: 1100,
  provide_organization: {
    name: 'Solution Provider Organization',
    logo_url: null,
    website: null,
  },
  overview_description:
    'A product is a tangible item that is put on the market for acquisition, attention, or consumption, while a service is an intangible item, which arises from the output of one or more individuals. Although it seems like the main distinction between the two concepts is founded on their tangibility, that is not always the case. In most cases services are intangible, but products are not always tangible. ZOOM Cloud Meetings is an intelligently engineered video conference software that can help you arrange video meetings, conferences, and video webinars from a remote location. It can build collaboration-enabled conference rooms.',
  scope_of_work_description:
    'A product is a tangible item that is put on the market for acquisition, attention, or consumption, while a service is an intangible item, which arises from the output of one or more individuals. Although it seems like the main distinction between the two concepts is founded on their tangibility, that is not always the case. In most cases services are intangible, but products are not always tangible.',
  sidebar_info: {
    primary_price: {
      id: 1,
      solution: 1,
      stripe_price_id: 'randomString',
      price: 10,
      currency: 'USD',
      is_primary: true,
    },
    price: 120,
    features: [
      { name: '10 Ready Capacity' },
      { name: '14 Eta Days' },
      { name: 'Free Trial' },
      { name: 'Benefit 4' },
      { name: 'Benefit 5' },
    ],
    purchaseDisableOption: true,
  },
  questions: [
    {
      id: 1,
      solution: 1,
      title: '123123123',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.',
      created: '2021-11-15T21:38:36.066629Z',
      updated: '2021-11-16T23:41:57.250264Z',
    },
    {
      id: 2,
      solution: 1,
      title: '1231231231',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
      created: '2021-11-17T00:00:51.914002Z',
      updated: '2021-11-17T00:00:51.914002Z',
    },
    {
      id: 3,
      solution: 1,
      title: '222222222222',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
      created: '2021-11-17T00:00:52.023369Z',
      updated: '2021-11-17T00:00:52.023369Z',
    },
  ],
  my_solution_vote: 3,
  my_solution_bookmark: null,
}

export function DefaultSolutionDetailIntroduction() {
  return <SolutionDetailIntroduction introductionData={introductionData} />
}
