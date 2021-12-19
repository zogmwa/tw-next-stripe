import React from 'react'
import { Freshchat } from 'reactjs-freshchat'
import { useUserContext } from '@taggedweb/hooks/use-user'

export function FreshChat() {
  const { authVerified, pk, email, first_name, last_name } = useUserContext()
  return (
    <>
      {authVerified ? (
        <Freshchat
          token={process.env.FRESHCHAT_TOKEN}
          externalId={`${pk}`}
          firstName={first_name}
          lastName={last_name}
          email={email}
        />
      ) : (
        <Freshchat token={process.env.FRESHCHAT_TOKEN} />
      )}
    </>
  )
}
