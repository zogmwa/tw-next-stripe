import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { HomepageFeatured } from './homepage-featured'

export default {
  title: 'General/HomePageFeaturedList',
  component: HomepageFeatured,
} as Meta

const featuredList = [
  {
    name: 'Email-marketing',
    assets: [
      {
        name: 'Campaign Monitor',
        logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
        slug: 'campaign-monitor',
      },
      {
        name: 'Hubspot Marketing Hub',
        logo_url: 'http://logo.clearbit.com/hubspot.com',
        slug: 'hubspot-marketing-hub',
      },
      {
        name: 'PersistIQ',
        logo_url: 'https://logo.clearbit.com/www.persistiq.com',
        slug: 'persistiq',
      },
      {
        name: 'Mailchimp',
        logo_url: 'http://logo.clearbit.com/mailchimp.com',
        slug: 'mailchimp',
      },
      {
        name: 'Hopsworks',
        logo_url: 'https://logo.clearbit.com/www.hopsworks.ai',
        slug: 'hopsworks-ai',
      },
    ],
  },
  {
    name: 'Marketplace',
    assets: [
      {
        name: 'WIREWAX',
        logo_url: 'https://logo.clearbit.com/www.wirewax.com',
        slug: 'wirewax',
      },
      {
        name: 'DataRobot',
        logo_url: 'https://logo.clearbit.com/www.datarobot.com',
        slug: 'datarobot',
      },
      {
        name: 'Freshworks',
        logo_url: 'http://logo.clearbit.com/freshworks.com',
        slug: 'freshworks',
      },
      {
        name: 'Docusign',
        logo_url: 'http://logo.clearbit.com/docusign.com',
        slug: 'docusign',
      },
      {
        name: 'Cauliflower',
        logo_url: 'https://logo.clearbit.com/www.cauliflower.ai',
        slug: 'cauliflower',
      },
    ],
  },
  {
    name: 'Compilance',
    assets: [
      {
        name: 'PngTree',
        logo_url: 'http://logo.clearbit.com/pngtree.com',
        slug: 'pngtree',
      },
      {
        name: 'Neuton AutoML',
        logo_url: 'https://logo.clearbit.com/neuton.ai',
        slug: 'neuton-automl',
      },
      {
        name: 'DigitalOcean',
        logo_url: 'http://logo.clearbit.com/digitalocean.com',
        slug: 'digitalocean',
      },
      {
        name: 'Luminate',
        logo_url: 'https://logo.clearbit.com/luminategroup.com',
        slug: 'luminate',
      },
      {
        name: 'SAP Conversational AI',
        logo_url: 'https://logo.clearbit.com/www.sap.com',
        slug: 'sap-conversational-ai',
      },
    ],
  },
  {
    name: 'Identity Resolution',
    assets: [
      {
        name: 'GetResponse',
        logo_url: 'http://logo.clearbit.com/getresponse.com',
        slug: 'getresponse',
      },
      {
        name: 'WorldFavor',
        logo_url: 'http://logo.clearbit.com/worldfavor.com',
        slug: 'worldfavor',
      },
      {
        name: 'Appen',
        logo_url: 'https://logo.clearbit.com/appen.com',
        slug: 'appen',
      },
      {
        name: 'Footprints for Retail',
        logo_url: 'https://logo.clearbit.com/footprintsforretail.com',
        slug: 'footprints-for-retail',
      },
      {
        name: 'Mapistry',
        logo_url: 'http://logo.clearbit.com/mapistry.com',
        slug: 'mapistry',
      },
    ],
  },
  {
    name: 'Talent Intelligence',
    assets: [
      {
        name: 'Datadog',
        logo_url: 'http://logo.clearbit.com/datadog.com',
        slug: 'datadog',
      },
      {
        name: 'Datacamp',
        logo_url: 'http://logo.clearbit.com/datacamp.com',
        slug: 'datacamp',
      },
      {
        name: 'Accern',
        logo_url: 'http://logo.clearbit.com/accern.com',
        slug: 'accern',
      },
      {
        name: 'Veritone Automate Studio',
        logo_url: 'https://logo.clearbit.com/www.veritone.com',
        slug: 'veritone-automate-studio',
      },
      {
        name: 'Metigy',
        logo_url: 'https://logo.clearbit.com/metigy.com',
        slug: 'metigy',
      },
    ],
  },
]

export function DefaultHomePageFooter() {
  return <HomepageFeatured featuredList={featuredList} />
}
