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
    services: [
      {
        id: 1,
        name: 'Campaign Monitor',
        logo_url: 'http://logo.clearbit.com/campaignmonitor.com',
        slug: 'campaign-monitor',
      },
      {
        id: 2,
        name: 'Hubspot Marketing Hub',
        logo_url: 'http://logo.clearbit.com/hubspot.com',
        slug: 'hubspot-marketing-hub',
      },
      {
        id: 3,
        name: 'PersistIQ',
        logo_url: 'https://logo.clearbit.com/www.persistiq.com',
        slug: 'persistiq',
      },
      {
        id: 4,
        name: 'Mailchimp',
        logo_url: 'http://logo.clearbit.com/mailchimp.com',
        slug: 'mailchimp',
      },
      {
        id: 5,
        name: 'Hopsworks',
        logo_url: 'https://logo.clearbit.com/www.hopsworks.ai',
        slug: 'hopsworks-ai',
      },
    ],
  },
  {
    name: 'Marketplace',
    services: [
      {
        id: 6,
        name: 'WIREWAX',
        logo_url: 'https://logo.clearbit.com/www.wirewax.com',
        slug: 'wirewax',
      },
      {
        id: 7,
        name: 'DataRobot',
        logo_url: 'https://logo.clearbit.com/www.datarobot.com',
        slug: 'datarobot',
      },
      {
        id: 8,
        name: 'Freshworks',
        logo_url: 'http://logo.clearbit.com/freshworks.com',
        slug: 'freshworks',
      },
      {
        id: 9,
        name: 'Docusign',
        logo_url: 'http://logo.clearbit.com/docusign.com',
        slug: 'docusign',
      },
      {
        id: 10,
        name: 'Cauliflower',
        logo_url: 'https://logo.clearbit.com/www.cauliflower.ai',
        slug: 'cauliflower',
      },
    ],
  },
  {
    name: 'Compilance',
    services: [
      {
        id: 11,
        name: 'PngTree',
        logo_url: 'http://logo.clearbit.com/pngtree.com',
        slug: 'pngtree',
      },
      {
        id: 12,
        name: 'Neuton AutoML',
        logo_url: 'https://logo.clearbit.com/neuton.ai',
        slug: 'neuton-automl',
      },
      {
        id: 13,
        name: 'DigitalOcean',
        logo_url: 'http://logo.clearbit.com/digitalocean.com',
        slug: 'digitalocean',
      },
      {
        id: 14,
        name: 'Luminate',
        logo_url: 'https://logo.clearbit.com/luminategroup.com',
        slug: 'luminate',
      },
      {
        id: 15,
        name: 'SAP Conversational AI',
        logo_url: 'https://logo.clearbit.com/www.sap.com',
        slug: 'sap-conversational-ai',
      },
    ],
  },
  {
    name: 'Identity Resolution',
    services: [
      {
        id: 16,
        name: 'GetResponse',
        logo_url: 'http://logo.clearbit.com/getresponse.com',
        slug: 'getresponse',
      },
      {
        id: 17,
        name: 'WorldFavor',
        logo_url: 'http://logo.clearbit.com/worldfavor.com',
        slug: 'worldfavor',
      },
      {
        id: 18,
        name: 'Appen',
        logo_url: 'https://logo.clearbit.com/appen.com',
        slug: 'appen',
      },
      {
        id: 19,
        name: 'Footprints for Retail',
        logo_url: 'https://logo.clearbit.com/footprintsforretail.com',
        slug: 'footprints-for-retail',
      },
      {
        id: 20,
        name: 'Mapistry',
        logo_url: 'http://logo.clearbit.com/mapistry.com',
        slug: 'mapistry',
      },
    ],
  },
  {
    name: 'Talent Intelligence',
    services: [
      {
        id: 21,
        name: 'Datadog',
        logo_url: 'http://logo.clearbit.com/datadog.com',
        slug: 'datadog',
      },
      {
        id: 22,
        name: 'Datacamp',
        logo_url: 'http://logo.clearbit.com/datacamp.com',
        slug: 'datacamp',
      },
      {
        id: 23,
        name: 'Accern',
        logo_url: 'http://logo.clearbit.com/accern.com',
        slug: 'accern',
      },
      {
        id: 24,
        name: 'Veritone Automate Studio',
        logo_url: 'https://logo.clearbit.com/www.veritone.com',
        slug: 'veritone-automate-studio',
      },
      {
        id: 25,
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
