import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ContractDetail } from '.'

export default {
  title: 'General/SolutionBookingDetail',
  component: ContractDetail,
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
      pay_now_price_stripe_id: null,
      pay_now_price_unit_amount: null,
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
      capacity_used: 0,
      consultation_scheduling_link: 'https://calendly.com/jay-prakash-ece09/discussion-on-the-state-of-mfa',
      description:
        'With increasingly common incidents and increased sense of security in enterprise customers, the need for reliable and usable two/multi-factor authentication is rising . Phishing attacks have seen massive, manifolds, rise in 2021 and total loss due to cybercrimes is expected to hit around $6 trillion in 2021. Identifying suitability and correct forms of 2FA integrations are important for businesses wherein usability and security balance has to be taken into consideration.\r\n\r\nThis consultation is centered around the evaluation of current forms of 2FA, risk analysis and possible vector of compromises and will be provided by Jay Prakash, a PhD, former visiting researcher at UIUC and the architect of Silent Auth MFA framework by Silence Laboratories.',
      is_searchable: true,
      scope_of_work:
        'This consultation will be an hour long centered as a discussion to help you answer questions like:\r\n\r\n- Evaluation of current modalities of 2FA/MFA in use by the customer from lenses of security, risk adaptations and usability.\r\n\r\n- What are the best possible ways to nullify identified vulnerabilities with contextualised adoptions and modifications with minimizing friction?\r\n\r\n- What are the upcoming methods and practices of MFA and identity which business should be aware of?\r\n\r\nUnder this solution, we will sit together on a call to discuss your authentication related issues and problems and we will try to figure out the best possible solutions for it. We at Silence Labs are also open to the possibility of a follow-up longer-term engagement if needed to update your organization with state of the art MFA security. Once you book this solution you should receive an email with a scheduling link.',
      type: 'C',
      is_metered: null,
      team_size: null,
      estimated_hours: null,
      blended_hourly_rate: null,
      billing_period: null,
    },
    booked_by: 3,
    manager: null,
    status: 'Pending',
    started_at: '2021-12-20T19:06:05.616142Z',
    updated: '2021-12-20T19:06:05.616142Z',
    price_at_booking: 10,
    provider_notes: 'This is solution provider note.',
    metered_booking_info: null,
  },
]

export function DefaultSolutionBookingDetail() {
  return (
    <>
      {contractsList.map((contract, index) => (
        <ContractDetail key={index} contractData={contract} />
      ))}
    </>
  )
}
