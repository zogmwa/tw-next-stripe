import React from 'react'
import { UsageReport } from '.'

export default {
  title: 'General/UsageReport',
  component: UsageReport,
}

export function defaultUsageReport() {
  return <UsageReport usage_reports={[]} />
}
