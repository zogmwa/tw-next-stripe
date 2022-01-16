import React from 'react'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { AddPaymentCardDetail } from '@taggedweb/components/add-payment-card-detail'
import { PaymentMethodAttachToUser } from '@taggedweb/queries/user'

export default function PaymentCancelPage() {
  const { authVerified } = useUserContext()

  const addCard = async (paymentMethod) => {
    const data = await PaymentMethodAttachToUser(paymentMethod.id)
    console.log(data)
  }

  if (!authVerified) return null

  return <AddPaymentCardDetail addCard={addCard} />
}
