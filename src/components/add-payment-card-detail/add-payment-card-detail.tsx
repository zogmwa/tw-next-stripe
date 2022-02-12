import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import clsx from 'clsx'
import { Input } from '../input'
import { Button } from '../button'

const card_element_option = {
  style: {
    base: {
      padding: '10px',
      fontSize: '1rem',
      fontHeight: '1.5rem',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#9eacbf',
      },
    },
  },
}

const CardField = ({ onChange }) => (
  <div className="mt-2">
    <span className="text-sm text-text-primary">Card Info</span>
    <div className="py-2 px-4 font-base border border-border-default rounded-md">
      <CardElement options={card_element_option} onChange={onChange} />
    </div>
  </div>
)

const InputField = ({ label, id, type, placeholder, required, autoComplete, value, onChange }) => (
  <div className="mt-2">
    <label htmlFor={id} className="text-sm text-text-primary">
      {label}
    </label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
)

const ErrorMessage = ({ children }) => (
  <div className="text-sm text-red-600" role="alert">
    {children}
  </div>
)

const CheckoutForm = ({ addCard, isShowEmail }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const card = elements.getElement(CardElement)

    if (card == null) {
      return
    }

    if (error) {
      card.focus()
      return
    }

    if (cardComplete) {
      setProcessing(true)
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: billingDetails,
    })

    if (payload.error) {
      setError(payload.error)
    } else {
      // ... SEND to your API server to process payment intent
      await addCard(payload.paymentMethod)
    }
    setProcessing(false)
  }

  return (
    <form className="form flex flex-col" onSubmit={handleSubmit}>
      {isShowEmail && (
        <fieldset className="form-group">
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            autoComplete="name"
            value={billingDetails.email}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, email: e.target.value })
            }}
          />
        </fieldset>
      )}
      <fieldset className="form-group">
        <InputField
          label="Name"
          id="name"
          type="text"
          placeholder="Your First and Last name"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value })
          }}
        />
      </fieldset>
      <fieldset className="form-group">
        <CardField
          onChange={(e) => {
            setError(e.error)
            setCardComplete(e.complete)
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <Button
        className={clsx('mt-6 bg-primary ', error ? 'border-red-600 !text-red-600' : '')}
        textClassName="text-text-on-surface"
        type="submit"
        loading={processing}
        disabled={processing || !stripe || error}
      >
        {processing ? 'Processing...' : 'Add Card'}
      </Button>
    </form>
  )
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISH_KEY)

type AddPaymentCardDetailComponentProps = {
  addCard: Function
  className?: string
  isShowEmail?: boolean
}

const AddPaymentCardDetailComponent = ({
  addCard,
  className,
  isShowEmail = false,
}: AddPaymentCardDetailComponentProps) => {
  return (
    <div className={clsx('AppWrapper ', className)}>
      <Elements stripe={stripePromise}>
        <CheckoutForm addCard={addCard} isShowEmail={isShowEmail} />
      </Elements>
    </div>
  )
}

export const AddPaymentCardDetail = AddPaymentCardDetailComponent
