import React from 'react'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { PaymentSuccess } from '@taggedweb/components/payment-success'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'

export default function PaymentSuccessPage() {
  const { authVerified, email } = useUserContext()

  if (!authVerified) return null

  return (
    <>
      <DynamicHeader title="Taggedweb | Payment Success" />
      <PaymentSuccess emailAddress={email} className="mt-12" />
    </>
  )
}
