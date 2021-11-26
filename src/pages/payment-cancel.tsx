import React from 'react'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { PaymentCancel } from '@taggedweb/components/payment-cancel'

export default function PaymentCancelPage() {
  const { authVerified } = useUserContext()

  if (!authVerified) return null

  return <PaymentCancel className="mt-12" />
}
