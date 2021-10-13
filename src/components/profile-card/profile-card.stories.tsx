import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ProfileCard } from './index'
import { User } from '../../types/user'
import { Profile } from '../../types/profile'

export default {
  title: 'General/ProfileCard',
  component: ProfileCard,
} as Meta

const Template = (args) => <ProfileCard {...args} />

export const ProfileCardComponent = Template.bind({})

const userContextValue: User = {
  pk: 76,
  username: 'pranjal',
  email: 'mittal.pranjal@gmail.com',
  first_name: 'Pranjal',
  last_name: 'Mittal',
}

const profileContextValue: Profile = {
  id: 2,
  username: 'pranjal',
  avatar: null,
  organization: {
    name: 'TaggedWeb',
  },
  submitted_assets: [
    {
      id: 3228,
      slug: 'liveramp',
      name: 'LiveRamp',
      logo_url: 'https://logo.clearbit.com/liveramp.com',
      logo: null,
      website: 'https://liveramp.com/',
      affiliate_link: null,
      short_description: null,
      description:
        'Our data connectivity platform gives companies and their partners the power to connect, control, and activate data to transform customer experiences and generate more valuable business outcomes.',
      promo_video: null,
      tags: [
        {
          slug: 'identity-resolution',
          name: 'Identity Resolution',
        },
      ],
      attributes: [],
      tweb_url: 'https://api.taggedweb.com/r/assets/liveramp',
      upvotes_count: 0,
      og_image_url: 'https://liveramp.com/wp-content/uploads/2020/12/home-hero-illustration@2x.png',
      price_plans: [],
      questions: [],
      customer_organizations: [],
      avg_rating: '0.0000000',
      reviews_count: 0,
      has_free_trial: false,
      snapshots: [],
      users_count: 0,
      my_asset_vote: null,
    },
    {
      id: 3223,
      slug: 'screely',
      name: 'Screely',
      logo_url: 'https://logo.clearbit.com/screely.com',
      logo: null,
      website: 'https://screely.com',
      affiliate_link: null,
      short_description: 'Instantly turn a screenshot into a browser mockup.',
      description: '',
      promo_video: 'https://www.youtube.com/watch?v=xUL24huQcvs',
      tags: [],
      attributes: [],
      tweb_url: 'https://api.taggedweb.com/r/assets/screely',
      upvotes_count: 0,
      og_image_url: '/meta-image.png',
      price_plans: [],
      questions: [],
      customer_organizations: [],
      avg_rating: '0.0000000',
      reviews_count: 0,
      has_free_trial: false,
      snapshots: [],
      users_count: 0,
      my_asset_vote: null,
    },
    {
      id: 3225,
      slug: 'journeyio',
      name: 'Journey.io',
      logo_url: 'https://logo.clearbit.com/journey.io',
      logo: null,
      website: 'http://journey.io',
      affiliate_link: null,
      short_description:
        'Create customized landing pages with introduction videos, slides, pages, and any embeddable content.',
      description:
        'Tell better stories and win more deals with Journey. Create a Journey to tell your story across video, slides and interactive embeds like calendars.',
      promo_video: null,
      tags: [],
      attributes: [],
      tweb_url: 'https://api.taggedweb.com/r/assets/journeyio',
      upvotes_count: 0,
      og_image_url: 'https://uploads-ssl.webflow.com/604dc536532dbdf60673ded9/604dc536532dbd6f0973deff_logo.svg',
      price_plans: [],
      questions: [],
      customer_organizations: [],
      avg_rating: '0.0000000',
      reviews_count: 0,
      has_free_trial: true,
      snapshots: [],
      users_count: 0,
      my_asset_vote: null,
    },
    {
      id: 3222,
      slug: 'tabnine',
      name: 'Tabnine',
      logo_url: 'https://logo.clearbit.com/www.tabnine.com',
      logo: null,
      website: 'https://www.tabnine.com/',
      affiliate_link: null,
      short_description: 'Code faster with AI completions',
      description:
        "Tabnine's AI assistant is always by your side, suggesting code completion right in your IDE. Tabnine delivers easy, interruption-free development for you and your team\r\nPrivacy & Protection.\r\n\r\nAll of Tabnine's code completion AI can be run locally on your machine. Your team’s code and AI training data are not shared, helping to ensure your code stays compliant.\r\n\r\nGet quick, concise code suggestions for easy in-flow integration using AI trained on your projects, patterns, and preferences",
      promo_video: 'https://www.youtube.com/embed/twPtvZuBrAg',
      tags: [
        {
          slug: 'code-autocomplete',
          name: 'Code Autocomplete',
        },
        {
          slug: 'artificial-intelligence',
          name: 'Artificial Intelligence',
        },
      ],
      attributes: [],
      tweb_url: 'https://api.taggedweb.com/r/assets/tabnine',
      upvotes_count: 0,
      og_image_url: null,
      price_plans: [],
      questions: [],
      customer_organizations: [],
      avg_rating: '0.0000000',
      reviews_count: 0,
      has_free_trial: true,
      snapshots: [],
      users_count: 0,
      my_asset_vote: null,
    },
    {
      id: 2458,
      slug: 'stripe-atlas',
      name: 'Stripe Atlas',
      logo_url: 'https://logo.clearbit.com/stripe.com',
      logo: null,
      website: 'https://stripe.com/atlas',
      affiliate_link: null,
      short_description: null,
      description:
        'Stripe Atlas is a powerful, safe, and easy-to-use platform for forming a company. By removing lengthy paperwork, legal complexity, and numerous fees, Stripe Atlas helps you launch your startup from anywhere in the world.',
      promo_video: null,
      tags: [
        {
          slug: 'incorporation',
          name: 'Incorporation',
        },
        {
          slug: 'startup',
          name: 'Startup',
        },
      ],
      attributes: [],
      tweb_url: 'https://api.taggedweb.com/r/assets/stripe-atlas',
      upvotes_count: 0,
      og_image_url: null,
      price_plans: [],
      questions: [],
      customer_organizations: [],
      avg_rating: '0.0000000',
      reviews_count: 0,
      has_free_trial: false,
      snapshots: [],
      users_count: 0,
      my_asset_vote: null,
    },
    {
      id: 3191,
      slug: 'eightfold-ai',
      name: 'Eightfold AI',
      logo_url: 'https://logo.clearbit.com/eightfold.ai',
      logo: null,
      website: 'https://eightfold.ai/',
      affiliate_link: null,
      short_description: 'AI-powered Talent Intelligence Platform',
      description:
        'AI talent management platform that transforms how you hire, retain and grow a diverse global workforce.\r\n\r\n- Enrich and Unlock the Power of Your Talent Data\r\n- Understand Employee Potential at Scale\r\n- Use AI to Hire for Potential\r\n- Rapidly staff the best contingent talent\r\n- Accelerate Diversity and Inclusion Programs with Unbiased AI\r\n- Eightfold AI Meets Global Standards and Best Practices',
      promo_video: 'https://www.youtube.com/embed/ZuaxbhuGgXA',
      tags: [
        {
          slug: 'recruiting',
          name: 'Recruiting',
        },
        {
          slug: 'talent-intelligence',
          name: 'Talent Intelligence',
        },
        {
          slug: 'artificial-intelligence',
          name: 'Artificial Intelligence',
        },
      ],
      attributes: [],
      tweb_url: 'https://api.taggedweb.com/r/assets/eightfold-ai',
      upvotes_count: 0,
      og_image_url: null,
      price_plans: [],
      questions: [],
      customer_organizations: [],
      avg_rating: '0.0000000',
      reviews_count: 0,
      has_free_trial: false,
      snapshots: [],
      users_count: 0,
      my_asset_vote: null,
    },
  ],
}

ProfileCardComponent.args = {
  data: Object.assign({}, userContextValue, profileContextValue),
}
