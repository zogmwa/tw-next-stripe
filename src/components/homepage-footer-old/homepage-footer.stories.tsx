import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { HomePageFooter } from './homepage-footer'
import { topTags } from '../../utils/top-tags'

export default {
  title: 'General/HomePageFooter',
  component: HomePageFooter,
} as Meta

export function DefaultHomePageFooter() {
  return <HomePageFooter topTags={topTags} />
}
