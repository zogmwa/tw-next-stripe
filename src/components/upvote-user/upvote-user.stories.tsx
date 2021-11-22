import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { UpvoteUser } from './'

export default {
  title: 'General/UpvoteByUser(Software & Solution)',
  component: UpvoteUser,
} as Meta

export function SimpleUpvoteUser() {
  return (
    <>
      <UpvoteUser
        isLoading={false}
        isVotedByMe={null}
        upvotesCount={521}
        usersCount={1404}
        toggleUpvote={() => console.log('Toggled event - Upvote.')}
      />
      <UpvoteUser
        isLoading={true}
        isVotedByMe={21}
        upvotesCount={521}
        usersCount={1404}
        toggleUpvote={() => console.log('Toggled event - Upvote.')}
      />
      <UpvoteUser
        isLoading={false}
        isVotedByMe={21}
        upvotesCount={521}
        usersCount={1404}
        toggleUpvote={() => console.log('Toggled event - Upvote.')}
      />
    </>
  )
}
