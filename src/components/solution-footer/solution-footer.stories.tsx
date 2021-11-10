import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { SolutionFooter } from './solution-footer'
import { ProductTopTags, SolutionTopTags } from '../../utils/top-tags'

export default {
  title: 'General/SolutionFooter',
  component: SolutionFooter,
} as Meta

export function DefaultSolutionFooter() {
  return <SolutionFooter productTags={ProductTopTags} solutionTags={SolutionTopTags} />
}
