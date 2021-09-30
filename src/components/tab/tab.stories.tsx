import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceDetailTab } from './service-detail-tab'

export default {
  title: 'General/Tab',
  component: ServiceDetailTab,
} as Meta

export function DefaultServiceDetailTab() {
  return <ServiceDetailTab />
}
