import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { BsCreditCard2Back } from 'react-icons/bs'
import clsx from 'clsx'
import { Button } from '../button'
import { Checkbox } from '../checkbox'

type MeteredPaymentMethodConfirmComponentProps = {
  className?: string
  slug: string
  paymentMethods: any[]
  setConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSubScribe: Function
  isSubscribe: boolean
}

function MeteredPaymentMethodConfirmComponent({
  className,
  slug,
  setConfirmModalOpen,
  paymentMethods,
  toggleSubScribe,
  isSubscribe,
}: MeteredPaymentMethodConfirmComponentProps) {
  const router = useRouter()
  const [agreeCard, setAgreeCard] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethods.filter((payment) => payment.default_payment_method)[0].id,
  )

  const subScribe = () => {
    if (agreeCard) {
      toggleSubScribe(paymentMethod)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value)
  }

  return (
    <div className={clsx('flex flex-col ', className)}>
      <div className="my-4">
        <RadioGroup
          aria-label="Sort By"
          defaultValue={paymentMethod}
          name="radio-buttons-group"
          value={paymentMethod}
          onChange={handleChange}
        >
          {paymentMethods.map((payment) => {
            const expireDate = new Date(payment.exp_year, Number(payment.exp_month) - 1)

            if (expireDate > new Date()) {
              return (
                <FormControlLabel
                  value={payment.id}
                  key={payment.id}
                  control={<Radio />}
                  label={
                    <div className="flex flex-row items-center" key={payment.id}>
                      <div className="flex flex-row text-text-primary items-center">
                        <BsCreditCard2Back className="text-lg text-text-primary" />
                        <span className="ml-2">**** **** **** {payment.last4}</span>
                      </div>
                      <span className="ml-4 text-text-primary">{`${payment.exp_year}/${payment.exp_month}`} exp</span>
                    </div>
                  }
                />
              )
            }
          })}
        </RadioGroup>
      </div>
      {slug && (
        <a href={`/add-card-details?slug=${slug}`} className="text-primary text-sm">
          Add a new card
        </a>
      )}
      <div className="flex items-center space-x-1.5 my-6">
        <Checkbox
          checked={agreeCard}
          onChange={(e) => setAgreeCard(e.target.checked)}
          size="md"
          id="terms-of-service"
        />
        <label htmlFor="terms-of-service" className="text-sm text-text-secondary">
          I will pay using this payment.
        </label>
      </div>
      <div className="flex flex-row justify-end space-x-2">
        <Button onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
        <Button
          className="bg-primary"
          textClassName="!text-text-on-surface"
          disabled={!agreeCard}
          loading={isSubscribe}
          onClick={() => subScribe()}
        >
          Subscribe
        </Button>
      </div>
    </div>
  )
}

export const MeteredPaymentMethodConfirm = MeteredPaymentMethodConfirmComponent
