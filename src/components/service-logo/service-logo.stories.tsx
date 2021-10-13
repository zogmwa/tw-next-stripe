import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceLogo } from './service-logo'

export default {
  title: 'General/Logo',
  component: ServiceLogo,
} as Meta

export function DefaultCard() {
  const serviceLogoMockupDataList = [
    {
      logo: 'http://logo.clearbit.com/campaignmonitor.com',
      owned: true,
    },
    {
      logo: 'http://logo.clearbit.com/campaignmonitor.com',
      owned: false,
    },
  ]

  return (
    <>
      {serviceLogoMockupDataList.map((service, index) => (
        <div>
          <ServiceLogo 
            key={index}
            logoUrl={service.logo}
            owned={service.owned}
          />
        </div>
      ))}
    </>
  )
}
