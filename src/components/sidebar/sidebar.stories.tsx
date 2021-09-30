import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceDetailSidebar } from './service-detail-sidebar'

export default {
  title: 'General/Sidebar',
  component: ServiceDetailSidebar,
} as Meta

export function DefaultServiceDetailSidebar() {
  return <ServiceDetailSidebar />
}
