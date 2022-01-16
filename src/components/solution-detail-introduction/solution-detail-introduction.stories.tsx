import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { SolutionDetailIntroduction } from '.'

export default {
  title: 'General/SolutionDetailIntroduction',
  component: SolutionDetailIntroduction,
} as Meta
const sidebar_info = {
  pay_now_price: {
    id: 1,
    solution: 1,
    stripe_price_id: 'randomString',
    price: 10,
    currency: 'USD',
    is_primary: true,
  },
  price: 120,
  features: [
    {
      id: 'ready-capacity',
      name: 'Only 9 more slots available at this time',
      tooltipContent:
        'To prevent overwhelming of the provider we limit the number of active bookings per available capacity.',
    },
    {
      id: 'eda-days',
      name: 'Estimated Days to Fulfill: 1',
      tooltipContent: 'This is an estimate on number of days it will take to deliver.',
    },
    {
      id: 'free-trial',
      name: 'Free Trial',
      tooltipContent: 'This solution has free trial.',
    },
  ],
  purchaseDisableOption: true,
  type: 'I',
  slug: 'test',
  is_metered: false,
}
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
  primary_tag: {
    name: 'Integrations',
    slug: 'integrations',
  },
  title: 'Improving application performance with APM, metrics and monitoring',
  type: 'I',
  upvoted_count: 324,
  booked_count: 1100,
  provide_organization: {
    name: 'Solution Provider Organization',
    logo_url: null,
    website: null,
  },
  point_of_contact: {
    id: 1,
    username: 'pranjal',
    first_name: 'Pranjal',
    last_name: 'Mittal',
  },
  description:
    'Indented code\r\n\r\n    // Some comments\r\n    line 1 of code\r\n    line 2 of code\r\n    line 3 of code\r\n\r\n\r\n## Typographic replacements',
  scope_of_work:
    '---\r\n__Advertisement :)__\r\n\r\n- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\r\n  resize in browser.\r\n- __[babelfish](https://github.com/nodeca/babelfish/)__',
  questions: [
    {
      id: 1,
      solution_id: 1,
      title: '123123123',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.',
      created: '2021-11-15T21:38:36.066629Z',
      updated: '2021-11-16T23:41:57.250264Z',
    },
    {
      id: 2,
      solution_id: 1,
      title: '1231231231',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
      created: '2021-11-17T00:00:51.914002Z',
      updated: '2021-11-17T00:00:51.914002Z',
    },
    {
      id: 3,
      solution_id: 1,
      title: '222222222222',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
      created: '2021-11-17T00:00:52.023369Z',
      updated: '2021-11-17T00:00:52.023369Z',
    },
  ],
  my_solution_vote: 3,
  my_solution_bookmark: null,
  is_metered: null,
  team_size: null,
  estimated_hours: null,
  blended_hourly_rate: null,
  billing_period: null,
}
const sidebar_info_ = {
  pay_now_price: {
    id: 1,
    solution: 1,
    stripe_price_id: 'randomString',
    price: 10,
    currency: 'USD',
    is_primary: true,
  },
  price: 120,
  features: [
    {
      id: 'ready-capacity',
      name: 'Only 9 more slots available at this time',
      tooltipContent:
        'To prevent overwhelming of the provider we limit the number of active bookings per available capacity.',
    },
    {
      id: 'eda-days',
      name: 'Estimated Days to Fulfill: 1',
      tooltipContent: 'This is an estimate on number of days it will take to deliver.',
    },
    {
      id: 'free-trial',
      name: 'Free Trial',
      tooltipContent: 'This solution has free trial.',
    },
  ],
  purchaseDisableOption: true,
  type: 'C',
  slug: 'test',
  is_metered: false,
}
const introductionData_ = {
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
  primary_tag: {
    name: 'Integrations',
    slug: 'integrations',
  },
  title: 'Improving application performance with APM, metrics and monitoring',
  type: 'C',
  upvoted_count: 324,
  booked_count: 1100,
  provide_organization: null,
  point_of_contact: {
    id: 1,
    username: 'pranjal',
    first_name: 'Pranjal',
    last_name: 'Mittal',
  },
  description:
    'Indented code\r\n\r\n    // Some comments\r\n    line 1 of code\r\n    line 2 of code\r\n    line 3 of code\r\n\r\n\r\n## Typographic replacements',
  scope_of_work:
    '---\r\n__Advertisement :)__\r\n\r\n- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\r\n  resize in browser.\r\n- __[babelfish](https://github.com/nodeca/babelfish/)__',
  questions: [
    {
      id: 1,
      solution_id: 1,
      title: '123123123',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.',
      created: '2021-11-15T21:38:36.066629Z',
      updated: '2021-11-16T23:41:57.250264Z',
    },
    {
      id: 2,
      solution_id: 1,
      title: '1231231231',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
      created: '2021-11-17T00:00:51.914002Z',
      updated: '2021-11-17T00:00:51.914002Z',
    },
    {
      id: 3,
      solution_id: 1,
      title: '222222222222',
      primary_answer:
        'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
      created: '2021-11-17T00:00:52.023369Z',
      updated: '2021-11-17T00:00:52.023369Z',
    },
  ],
  my_solution_vote: 3,
  my_solution_bookmark: null,
  is_metered: null,
  team_size: null,
  estimated_hours: null,
  blended_hourly_rate: null,
  billing_period: null,
}

export function DefaultSolutionDetailIntroduction() {
  return <SolutionDetailIntroduction introductionData={introductionData} sidebar_info={sidebar_info} />
}

export function PointOfContactSolutionDetailIntroduction() {
  return <SolutionDetailIntroduction introductionData={introductionData_} sidebar_info={sidebar_info_} />
}
