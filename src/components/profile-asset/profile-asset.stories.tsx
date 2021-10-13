import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ProfileAsset } from './index'
import { Asset } from '../../types/asset'

export default {
  title: 'General/ProfileAsset',
  component: ProfileAsset,
} as Meta

const asset: Asset = {
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
}

const Template = (args) => <ProfileAsset {...args} />

export const ProfileAssetComponent = Template.bind({})

ProfileAssetComponent.args = {
  asset,
}
