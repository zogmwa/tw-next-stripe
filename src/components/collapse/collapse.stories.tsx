import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServiceCollapse } from './collapse'

export default {
  title: 'General/ServiceCollapse',
  component: ServiceCollapse,
} as Meta

export function DefaultServiceCollapse() {
  return (
    <ServiceCollapse title="Test collapse">
      <div className="flex divide-x divide-border-default justify-items-around divide-solid">
        <span className="p-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
          amet blandit leo lobortis eget.
        </span>
        <span className="p-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
          amet blandit leo lobortis eget.
        </span>
      </div>
    </ServiceCollapse>
  )
}
