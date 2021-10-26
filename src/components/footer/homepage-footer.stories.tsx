import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { HomePageFooter } from './homepage-footer'
import { topTags } from '../../utils/top-tags'

export default {
  title: 'General/HomePageFooter',
  component: HomePageFooter,
} as Meta

const sectionOneData = [
  {
    name: 'Option 1',
    link: '#',
  },
  {
    name: 'Option 2',
    link: '#',
  },
  {
    name: 'Option 3',
    link: '#',
  },
  {
    name: 'Option 4',
    link: '#',
  },
]
const sectionTwoData = [
  {
    name: 'Option 5',
    link: '#',
  },
  {
    name: 'Option 6',
    link: '#',
  },
  {
    name: 'Option 7',
    link: '#',
  },
  {
    name: 'Option 8',
    link: '#',
  },
]
export function DefaultHomePageFooter() {
  return <HomePageFooter topTags={topTags} sectionOneData={sectionOneData} sectionTwoData={sectionTwoData} />
}
