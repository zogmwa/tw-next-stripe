import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { TruncatedDescription } from './tuncated-description'

export default {
  title: 'General/TruncatedDescription',
  component: TruncatedDescription,
} as Meta

export function DefaultTruncatedDescription() {
  const description =
    'Campaign Monitor is an email marketing tool that enables marketers to send beautiful and personalized emails, creating a reliable channel to grow engagement with subscribers and promote loyal readership and conversions.\r\n\r\n* Email templates\r\n* Drag-and-drop builder\r\n* Engagement-based segmentation (Allows digital marketers to deliver targeted content to lists of subscribers without any technical expertise)'
  return <TruncatedDescription description={description} />
}
