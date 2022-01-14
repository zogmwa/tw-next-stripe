import React from 'react'
import { Elements, ElementsConsumer, CardElement } from '@stripe/react-stripe-js'
import * as stripeJs from '@stripe/stripe-js'
import { Button } from '../button'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = stripeJs.loadStripe(process.env.STRIPE_PUBLISH_KEY)

const CheckoutForm = (props: any) => {
  // const stripe = useStripe();
  // const elements = useElements();
  const { elements, stripe } = props

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement)

    if (card == null) {
      return
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
      // ... SEND to your API server to process payment intent
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button type="submit" className="mt-2" disabled={!stripe}>
        Add Card
      </Button>
    </form>
  )
}

const AddCardComponent = () => {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>{(ctx: any) => <CheckoutForm {...ctx} />}</ElementsConsumer>
    </Elements>
  )
}

export const AddCard = AddCardComponent
