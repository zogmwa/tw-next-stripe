import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { UsageReport } from '.'

export default {
  title: 'General/UsageReport',
  component: UsageReport,
} as Meta

export function defaultUsageReport() {
  return <UsageReport usage_reports={[]} bookingId="12" />
}
