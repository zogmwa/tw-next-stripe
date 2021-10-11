import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { HighlightContent } from './service-highlight'

export default {
  title: 'General/ServiceHighlight',
  component: HighlightContent,
} as Meta

export function DefaultStarRating() {
  const attributes = [
    {
      id: 1,
      name: 'Is this useful?',
      is_con: false,
      upvotes_count: 0,
    },
    {
      id: 2,
      name: 'THis is bug',
      is_con: true,
      upvotes_count: 1,
    },
    {
      id: 3,
      name: 'Ok good',
      is_con: false,
      upvotes_count: 1,
    },
    {
      id: 4,
      name: 'no, it makes bug',
      is_con: true,
      upvotes_count: 0,
    },
    {
      id: 5,
      name: 'this is test',
      is_con: false,
      upvotes_count: 1,
    },
    {
      id: 6,
      name: 'Oh, how many?',
      is_con: false,
      upvotes_count: 0,
    },
  ]

  const attributeVotesList = [
    {
      id: 15,
      user: 2,
      attribute: 2,
      asset: 1,
      voted_on: '2021-10-10T21:11:20.210924Z',
    },
    {
      id: 16,
      user: 2,
      attribute: 5,
      asset: 1,
      voted_on: '2021-10-10T21:11:27.758405Z',
    },
    {
      id: 17,
      user: 2,
      attribute: 3,
      asset: 1,
      voted_on: '2021-10-10T21:11:30.088184Z',
    },
  ]

  return (
    <HighlightContent
      attributeVotesList={attributeVotesList}
      attributes={attributes}
      isLoading={false}
      clickedAttribute={0}
      upvoteAttribute={null}
      logoUrl={''}
    />
  )
}
