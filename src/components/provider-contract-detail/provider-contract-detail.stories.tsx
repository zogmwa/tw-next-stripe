import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ProviderContractDetail } from '.'

export default {
  title: 'General/ProviderSolutionBookingCard',
  component: ProviderContractDetail,
} as Meta

const trackingData = {
  current_period_start: '2022-01-25T02:23:39Z',
  current_period_end: '2022-02-01T02:23:39Z',
  tracking_times: [],
  booking_data: {
    id: 92,
    solution: {
      id: 9,
      slug: 'improving-multi-factor-authentication-at-your-organization-and-directions-for-contextualized-authentication-by-silence-laboratories',
      title:
        'Consultation on improving Multi-Factor-Authentication (MFA) at your organization, and directions for Contextualized Authentication by Silence Laboratories',
      type: 'C',
      description:
        'With increasingly common incidents and increased sense of security in enterprise customers, the need for reliable and usable two/multi-factor authentication is rising . Phishing attacks have seen massive, manifolds, rise in 2021 and total loss due to cybercrimes is expected to hit around $6 trillion in 2021. Identifying suitability and correct forms of 2FA integrations are important for businesses wherein usability and security balance has to be taken into consideration.\r\n\r\nThis consultation is centered around the evaluation of current forms of 2FA, risk analysis and possible vector of compromises and will be provided by Jay Prakash, a PhD, former visiting researcher at UIUC and the architect of Silent Auth MFA framework by Silence Laboratories.',
      point_of_contact: {
        id: 2,
        username: 'admin',
        first_name: 'Admin',
        last_name: 'Admin',
        avatar: null,
        email: 'admin@admin.com',
      },
      organization: null,
      assets: [],
      questions: [],
      scope_of_work:
        'This consultation will be an hour long centered as a discussion to help you answer questions like:\r\n\r\n- Evaluation of current modalities of 2FA/MFA in use by the customer from lenses of security, risk adaptations and usability.\r\n\r\n- What are the best possible ways to nullify identified vulnerabilities with contextualised adoptions and modifications with minimizing friction?\r\n\r\n- What are the upcoming methods and practices of MFA and identity which business should be aware of?\r\n\r\nUnder this solution, we will sit together on a call to discuss your authentication related issues and problems and we will try to figure out the best possible solutions for it. We at Silence Labs are also open to the possibility of a follow-up longer-term engagement if needed to update your organization with state of the art MFA security. Once you book this solution you should receive an email with a scheduling link.',
      primary_tag: null,
      eta_days: 5,
      follow_up_hourly_rate: null,
      capacity: 10,
      has_free_consultation: false,
      upvotes_count: 1,
      avg_rating: 0,
      is_published: false,
      booked_count: 1,
      is_searchable: true,
      consultation_scheduling_link: 'https://calendly.com/jay-prakash-ece09/discussion-on-the-state-of-mfa',
      capacity_used: 0,
      my_solution_review: null,
      my_solution_review_id: null,
      is_metered: true,
      team_size: null,
      estimated_hours: null,
      blended_hourly_rate: null,
      billing_period: null,
    },
    booked_by: {
      id: 2,
      username: 'admin',
      first_name: 'Admin',
      last_name: 'Admin',
      avatar: null,
      email: 'admin@admin.com',
    },
    manager: null,
    status: 'Pending',
    price_at_booking: null,
    created: '2022-01-25T11:19:47.944613Z',
    updated: '2022-01-25T11:19:47.944613Z',
    provider_notes: null,
    started_at: null,
    is_payment_completed: false,
    stripe_session_id: null,
    rating: null,
    metered_booking_info: {
      payment_status: 'active',
      start_date: '2022-01-25T02:23:39Z',
      billing_cycle_anchor: '2022-01-25T02:23:39Z',
      collection_method: 'charge_automatically',
      current_period_end: '2022-02-01T02:23:39Z',
    },
    pause_status: null,
  },
}

export function DefaultSolutionListingCard() {
  return (
    <>
      <ProviderContractDetail trackingData={trackingData} bookingId="12" username="" />
    </>
  )
}
