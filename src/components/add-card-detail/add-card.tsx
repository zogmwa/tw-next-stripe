import React from 'react'
import { Elements, ElementsConsumer, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../button'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISH_KEY)

function AddCardForm(props: any) {
  const handleSubmit = async () => {
    const { elements, stripe } = props
    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
      // ... SEND to your API server to process payment intent
    }
  }

  return (
    <div className="flex flex-col">
      <h1>stripe form</h1>
      <CardElement className="text-md" />
      <Button className="self-end" onClick={handleSubmit}>
        Add Card
      </Button>
    </div>
  )
}

export function AddCard() {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>{(ctx: any) => <AddCardForm {...ctx} />}</ElementsConsumer>
    </Elements>
  )
}
