import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ContractDetail } from '.'

export default {
  title: 'General/SolutionBookingDetail',
  component: ContractDetail,
} as Meta

const contractsList = [
  {
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
    },
    booked_by: 3,
    manager: null,
    status: 'Pending',
    started_at: '2021-12-20T19:06:05.616142Z',
    updated: '2021-12-20T19:06:05.616142Z',
    price_at_booking: 10,
    provider_notes: 'This is solution provider note.',
  },
]

export function DefaultSolutionBookingDetail() {
  return (
    <>
      {contractsList.map((contract, index) => (
        <ContractDetail contractData={contract} />
      ))}
    </>
  )
}
