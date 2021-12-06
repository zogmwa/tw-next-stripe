import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { RelatedSolutions } from './related-solutions'

export default {
  title: 'General/RelatedSolutions',
  component: RelatedSolutions,
} as Meta

export function DefaultServiceReviewCard() {
  const asset = {
    id: 1,
    slug: 'mailchimp',
    name: 'Mailchimp',
    logo_url: 'http://logo.clearbit.com/mailchimp.com',
    logo: null,
    website: 'http://mailchimp.com/',
    affiliate_link: null,
    short_description: null,
    description:
      'Mailchimp helps small businesses do big things, with the right tools and guidance every step of the way.\r\n\r\n* Marketing\r\n* Websites and Commerce\r\n* Transactional Emails',
    promo_video: 'https://www.youtube.com/embed/Q0hi9d1W3Ag',
    tags: [
      {
        slug: 'introductions',
        name: 'Introductions',
        description: 'Tools that help you get introductions to clientele, collaborators, investors, etc',
      },
      {
        slug: 'test-tag1',
        name: 'Test Tag1',
        description: null,
      },
    ],
    attributes: [
      {
        id: 1,
        name: 'attr1',
        is_con: false,
        upvotes_count: 0,
        my_asset_attribute_vote: null,
      },
      {
        id: 2,
        name: 'attr2',
        is_con: false,
        upvotes_count: 0,
        my_asset_attribute_vote: null,
      },
    ],
    tweb_url: 'https://api.taggedweb.com/r/assets/mailchimp',
    upvotes_count: 0,
    og_image_url: null,
    price_plans: [
      {
        id: 8,
        asset: 1,
        name: 'test name2',
        summary: null,
        currency: 'USD',
        price: '12',
        per: 'month',
        features: "['anothertest1', 'anothertest2']",
        most_popular: false,
      },
      {
        id: 7,
        asset: 1,
        name: 'test name1',
        summary: 'wqe',
        currency: 'USD',
        price: '0',
        per: 'Month',
        features: "['test1', 'test2', 'test3', 'test4']",
        most_popular: false,
      },
    ],
    questions: [],
    customer_organizations: [],
    solutions: [
      {
        id: 1,
        slug: 'test',
        stripe_product_id: null,
        title:
          'Improve the performance of your Python application instrumenting it with Datadog APM, Uncover performance bottlenecks',
        type: 'I',
        prices: [
          {
            id: 2,
            solution: 1,
            stripe_price_id: 'price_1JyKxFJYlLsCg3G3AD0qYmoM',
            price: '11.00',
            currency: 'USD',
            is_primary: false,
          },
          {
            id: 1,
            solution: 1,
            stripe_price_id: 'price_1JzLZDGAiB8oTF44Q1JHzopG',
            price: '10.00',
            currency: 'USD',
            is_primary: true,
          },
        ],
        description:
          '<a href=\\"https://www.datadoghq.com/product/apm/\\">Datadog APM</a> allows any portion of your code to be instrumented, helping you uncover performance bottlenecks.',
        point_of_contact: {
          id: 2,
          username: 'admin',
          first_name: 'admin',
          last_name: 'admin',
          avatar: null,
        },
        organization: {
          name: 'Taggedweb',
          website: null,
          logo_url: null,
        },
        tags: [
          {
            slug: 'test-tag1',
            name: 'Test Tag1',
            description: null,
          },
          {
            slug: 'test-tag2',
            name: 'Test Tag2',
            description: null,
          },
        ],
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
        ],
        questions: [
          {
            id: 1,
            solution: 1,
            title: 'Test question 1.',
            primary_answer:
              'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.',
            created: '2021-11-15T21:38:36.066629Z',
            updated: '2021-11-17T03:13:59.872292Z',
          },
          {
            id: 2,
            solution: 1,
            title: 'Test question 2.',
            primary_answer:
              'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
            created: '2021-11-17T00:00:51.914002Z',
            updated: '2021-11-17T03:13:59.997292Z',
          },
          {
            id: 3,
            solution: 1,
            title: 'This is another one.',
            primary_answer:
              'This is test answer. This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test answer.This is test an',
            created: '2021-11-17T00:00:52.023369Z',
            updated: '2021-11-17T03:14:00.122282Z',
          },
        ],
        scope_of_work:
          'A product is a tangible item that is put on the market for acquisition, attention, or consumption, while a service is an intangible item, which arises from the output of one or more individuals. Although it seems like the main distinction between the two concepts is founded on their tangibility, that is not always the case. In most cases services are intangible, but products are not always tangible.',
        primary_tag: {
          slug: 'test-tag1',
          name: 'Test Tag1',
          description: null,
        },
        eta_days: null,
        follow_up_hourly_rate: null,
        capacity: 10,
        has_free_consultation: true,
        upvotes_count: 5,
        avg_rating: '0.0000000',
        reviews_count: 0,
        is_published: true,
        booked_count: 17,
        bookings_pending_fulfillment_count: 1,
      },
      {
        id: 3,
        slug: 'no-price',
        stripe_product_id: null,
        title: 'this is test solution',
        type: 'I',
        prices: [],
        description: '',
        point_of_contact: null,
        organization: null,
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
        avg_rating: '0.0000000',
        reviews_count: 0,
        is_published: true,
        booked_count: 0,
        bookings_pending_fulfillment_count: 0,
      },
    ],
    avg_rating: '0.0000000',
    reviews_count: 0,
    has_free_trial: false,
    trial_days: null,
    snapshots: [],
    users_count: 0,
    used_by_me: false,
    my_asset_vote: null,
    is_owned: false,
    edit_allowed: false,
  }

  return <RelatedSolutions service={asset} />
}
