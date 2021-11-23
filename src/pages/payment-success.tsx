import React from 'react'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { PaymentSuccess } from '@taggedweb/components/payment-success'

export default function PaymentSuccessPage() {
  const { authVerified, email } = useUserContext()

  if (!authVerified) return null

  return <PaymentSuccess emailAddress={email} className="mt-12" />
}
