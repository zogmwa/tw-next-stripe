import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ProviderContractCard } from '.'

export default {
  title: 'General/ProviderSolutionBookingCard',
  component: ProviderContractCard,
} as Meta

const contractsList = [
  {
    id: 1,
    rating: 1,
    solution: {
      id: 3,
      slug: 'no-price',
      stripe_product_id: null,
      title: 'Test solution title.',
      type: 'I',
      pay_now_price_stripe_id: null,
      pay_now_price_unit_amount: null,
      description: '',
      point_of_contact: null,
      avg_rating: 2,
      my_solution_review: 'H',
      my_solution_review_id: 10,
      organization: {
        name: 'Solution Provider Organization',
        logo_url: null,
      },
      tags: [],
      assets: [
        {
          id: 1,
          slug: 'mailchimp',
          name: 'Mailchimp',
          logo_url: 'http://logo.clearbit.com/mailchimp.com',
          logo: null,
          website: 'http://mailchimp.com/',
        },
      ],
      questions: [],
      scope_of_work: '',
      primary_tag: null,
      eta_days: null,
      follow_up_hourly_rate: null,
      capacity: 0,
      has_free_consultation: false,
      upvotes_count: 0,
      reviews_count: 0,
      is_published: true,
      booked_count: 1,
      bookings_pending_fulfillment_count: 1,
      consultation_scheduling_link: null,
      is_searchable: false,
      capacity_used: 0,
      is_metered: true,
      team_size: null,
      estimated_hours: null,
      blended_hourly_rate: null,
      billing_period: null,
    },
    booked_by: {
      id: 3,
      username: 'Booked User',
      first_name: 'Booked',
      last_name: 'User',
      avatar: null,
      email: 'admin@admin.com',
    },
    manager: null,
    status: 'active',
    started_at: '2021-12-20T19:06:05.616142Z',
    created: '2021-12-20T19:06:05.616142Z',
    updated: '2021-12-20T19:06:05.616142Z',
    price_at_booking: 10.0,
    provider_notes: '',
    metered_booking_info: {
      metered_status: 'active',
      start_date: '2022-01-23T17:16:34Z',
      billing_cycle_anchor: '2022-01-23T17:16:34Z',
      collection_method: 'charge_automatically',
      current_period_end: '2022-01-30T17:16:34Z',
    },
  },
  {
    id: 2,
    rating: -1,
    solution: {
      id: 3,
      slug: 'no-price',
      stripe_product_id: null,
      title: 'Test solution title.',
      type: 'I',
      pay_now_price_stripe_id: null,
      pay_now_price_unit_amount: null,
      description: '',
      point_of_contact: null,
      avg_rating: -2,
      my_solution_review: 'S',
      my_solution_review_id: 3,
      organization: {
        name: 'Solution Provider Organization',
        logo_url: null,
      },
      tags: [],
      assets: [
        {
          id: 1,
          slug: 'mailchimp',
          name: 'Mailchimp',
          logo_url: 'http://logo.clearbit.com/mailchimp.com',
          logo: null,
          website: 'http://mailchimp.com/',
        },
      ],
      questions: [],
      scope_of_work: '',
      primary_tag: null,
      eta_days: null,
      follow_up_hourly_rate: null,
      capacity: 0,
      has_free_consultation: false,
      upvotes_count: 0,
      reviews_count: 0,
      is_published: true,
      booked_count: 1,
      bookings_pending_fulfillment_count: 1,
      consultation_scheduling_link: null,
      is_searchable: false,
      capacity_used: 0,
      is_metered: null,
      team_size: null,
      estimated_hours: null,
      blended_hourly_rate: null,
      billing_period: null,
    },
    booked_by: {
      id: 3,
      username: 'Booked User',
      first_name: 'Booked',
      last_name: 'User',
      avatar: null,
      email: 'admin@admin.com',
    },
    manager: null,
    status: 'In Progress',
    price_at_booking: 10.0,
    started_at: '2021-12-20T19:06:05.616142Z',
    created: '2021-12-20T19:06:05.616142Z',
    updated: '2021-12-20T19:06:05.616142Z',
    provider_notes: '',
    metered_booking_info: null,
  },
  {
    id: 3,
    rating: 0,
    solution: {
      id: 3,
      slug: 'no-price',
      stripe_product_id: null,
      title: 'Test solution title.',
      type: 'I',
      pay_now_price_stripe_id: null,
      pay_now_price_unit_amount: null,
      description: '',
      point_of_contact: null,
      avg_rating: 0,
      my_solution_review: 'N',
      my_solution_review_id: 23,
      organization: {
        name: 'Solution Provider Organization',
        logo_url: null,
      },
      tags: [],
      assets: [
        {
          id: 1,
          slug: 'mailchimp',
          name: 'Mailchimp',
          logo_url: 'http://logo.clearbit.com/mailchimp.com',
          logo: null,
          website: 'http://mailchimp.com/',
        },
      ],
      questions: [],
      scope_of_work: '',
      primary_tag: null,
      eta_days: null,
      follow_up_hourly_rate: null,
      capacity: 0,
      has_free_consultation: false,
      upvotes_count: 0,
      reviews_count: 0,
      is_published: true,
      booked_count: 1,
      bookings_pending_fulfillment_count: 1,
      consultation_scheduling_link: null,
      is_searchable: false,
      capacity_used: 0,
      is_metered: null,
      team_size: null,
      estimated_hours: null,
      blended_hourly_rate: null,
      billing_period: null,
    },
    booked_by: {
      id: 3,
      username: 'Booked User',
      first_name: 'Booked',
      last_name: 'User',
      avatar: null,
      email: 'admin@admin.com',
    },
    manager: null,
    status: 'In Review',
    price_at_booking: 10.0,
    started_at: '2021-12-20T19:06:05.616142Z',
    created: '2021-12-20T19:06:05.616142Z',
    updated: '2021-12-20T19:06:05.616142Z',
    provider_notes: '',
    metered_booking_info: null,
  },
  {
    id: 0,
    rating: null,
    solution: {
      id: 3,
      slug: 'no-price',
      stripe_product_id: null,
      title: 'Test solution title.',
      type: 'I',
      pay_now_price_stripe_id: null,
      pay_now_price_unit_amount: null,
      description: '',
      point_of_contact: null,
      avg_rating: 0,
      my_solution_review: 'N',
      my_solution_review_id: 25,
      organization: {
        name: 'Solution Provider Organization',
        logo_url: null,
      },
      tags: [],
      assets: [
        {
          id: 1,
          slug: 'mailchimp',
          name: 'Mailchimp',
          logo_url: 'http://logo.clearbit.com/mailchimp.com',
          logo: null,
          website: 'http://mailchimp.com/',
        },
      ],
      questions: [],
      scope_of_work: '',
      primary_tag: null,
      eta_days: null,
      follow_up_hourly_rate: null,
      capacity: 0,
      has_free_consultation: false,
      upvotes_count: 0,
      reviews_count: 0,
      is_published: true,
      booked_count: 1,
      bookings_pending_fulfillment_count: 1,
      consultation_scheduling_link: null,
      is_searchable: false,
      capacity_used: 0,
      is_metered: null,
      team_size: null,
      estimated_hours: null,
      blended_hourly_rate: null,
      billing_period: null,
    },
    booked_by: {
      id: 3,
      username: 'Booked User',
      first_name: 'Booked',
      last_name: 'User',
      avatar: null,
      email: 'admin@admin.com',
    },
    manager: null,
    status: 'Completed',
    price_at_booking: 10.0,
    started_at: null,
    created: '2021-12-20T19:06:05.616142Z',
    updated: '2021-12-20T19:06:05.616142Z',
    provider_notes: '',
    metered_booking_info: null,
  },
]

export function DefaultSolutionListingCard() {
  return (
    <>
      {contractsList.map((contract, index) => (
        <ProviderContractCard key={`${index}contract`} contractData={contract} />
      ))}
    </>
  )
}
