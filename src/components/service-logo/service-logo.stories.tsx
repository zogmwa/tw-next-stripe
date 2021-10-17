import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceLogo } from './service-logo'

export default {
  title: 'General/Logo',
  component: ServiceLogo,
} as Meta

export function DefaultLogo() {
  const serviceLogoMockupDataList = [
    {
      id: 1,
      name: 'server name 1',
      logo: 'http://logo.clearbit.com/campaignmonitor.com',
      is_owned: true,
    },
    {
      id: 2,
      name: 'server name 2',
      logo: 'http://logo.clearbit.com/campaignmonitor.com',
      is_owned: false,
    },
    {
      id: 3,
      name: 'server name 2',
      logo: 'https://logo.clearbit.com/businesshangouts.jetvideo.io',
      is_owned: false,
    },
  ]

  return (
    <>
      {serviceLogoMockupDataList.map((service) => (
        <div key={service.id}>
          <ServiceLogo
            serviceName={service.name}
            serviceId={service.id}
            logoUrl={service.logo}
            owned={service.is_owned}
          />
        </div>
      ))}
    </>
  )
}
