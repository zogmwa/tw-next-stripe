import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Breadcrumb } from './breadcrumb'

export default {
  title: 'General/BreadcrumbComponent',
  component: Breadcrumb,
} as Meta

const breadcrumbItems = [
  {
    name: 'Search',
    url: '/',
    is_selected: false,
  },
  {
    name: 'Integrations',
    url: '/search/integrations',
    is_selected: false,
  },
  {
    name: 'User Interface',
    url: '/search/integrations/user-interface',
    is_selected: true,
  },
]

export function DefaultBreadcrumb() {
  return <Breadcrumb breadcrumbs={breadcrumbItems} />
}
