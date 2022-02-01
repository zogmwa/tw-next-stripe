import React from 'react'
import { UsageReport } from '.'

export default {
  title: 'General/UsageReport',
  component: UsageReport,
} as Meta

export function defaultUsageReport() {
  return <UsageReport usage_reports={[]} />
}
