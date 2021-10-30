import React from 'react'
import { useRouter } from 'next/router'
import { SearchBar } from '../components/search-bar'
import { Button } from '../components/button'
import { useRequireLogin } from '../hooks/use-require-login'
import { HomepageFeatured } from '../components/homepage-featured'

export default function Home() {
  const router = useRouter()
  const { requireLoginBeforeAction } = useRequireLogin()
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

  return (
    <div>
      <div className="max-w-screen-lg pl-2 mx-auto">
        <div className="flex flex-col items-start justify-start my-12 space-y-8">
          <h1 className="text-4xl font-semibold">Find the best SaaS software and web services for your needs</h1>
          <SearchBar
            onSubmit={(selectedTag) => {
              router.push(`/search/${selectedTag}`)
            }}
          />
        </div>
      </div>
      <div className="py-12 bg-gray-100">
        <div className="max-w-screen-lg px-4 mx-auto">
          <div className="flex flex-col items-center justify-start px-2 md:px-0 md:flex-row">
            <div className="flex flex-col items-start justify-center mb-2 md:w-12/12">
              <h4 className="mb-4 text-3xl text-black">
                We help you find and evaluate the best SaaS Software and Services for your needs
              </h4>
              <div className="mb-4 text-lg text-gray-600">
                {' '}
                <p>
                  Whether you work at a large enterprise, a small business, or a non-profit: our mission just does not
                  end with just helping you find a good SaaS option. We want it to be the best fit for solving your
                  problems. If you aren&apos;t sure if a software or a web service will work for you and want to further
                  evaluate it under a trial or learn how to use it, then we will work together with you to evaluate it
                  and we will find you domain experts who can show you how to effectively utilize specific tools, for
                  your use-cases.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 bg-blue-600">
        <div className="max-w-screen-lg px-4 mx-auto">
          <div className="flex flex-col items-center justify-start px-2 md:px-0 md:flex-row">
            <div className="flex flex-col items-start justify-center mb-2 md:w-7/12">
              <div className="mb-6 text-4xl font-semibold text-white">
                Are you a SaaS provider or creator? Connect with more users
              </div>
              <div className="mb-4 text-2xl text-gray-300">
                Help people discover your SaaS service and it&apos;s features by adding it to TaggedWeb
              </div>
              <Button
                buttonType="primary"
                className="mt-2 mr-2"
                onClick={requireLoginBeforeAction(() => {
                  router.push('/submit-service')
                })}
              >
                Add your web service (It&apos;s free)
              </Button>
            </div>
            <div className="flex-1">
              <img src="/images/homepage_pic.jpg" alt="homepage_pic" className="w-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg pl-2 mx-auto my-16">
        <HomepageFeatured featuredList={featuredList} />
      </div>
    </div>
  )
}
