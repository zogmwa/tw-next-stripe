import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { FooterComponent } from './footer'
import { TopSaasTags, TopSolutionTags } from '../../utils/top-tags'

export default {
  title: 'General/FooterComponent',
  component: FooterComponent,
} as Meta

export function DefaultFooterComponent() {
  return <FooterComponent topSaasTags={TopSaasTags} topSolutionTags={TopSolutionTags} />
}
