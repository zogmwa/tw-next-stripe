/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { BsCreditCard2Back } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import clsx from 'clsx'
import { toggleDetachPaymentMethod } from '@taggedweb/queries/user'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { Modal } from '../Modal'

type MeteredPaymentMethodConfirmComponentProps = {
  className?: string
  slug: string
  paymentMethods: any[]
  setConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSubScribe: Function
  isSubscribe: boolean
  partner_customer_uid?: string
}

function MeteredPaymentMethodConfirmComponent({
  className,
  slug,
  setConfirmModalOpen,
  paymentMethods,
  toggleSubScribe,
  isSubscribe,
  partner_customer_uid = '',
}: MeteredPaymentMethodConfirmComponentProps) {
  const router = useRouter()
  const [agreeCard, setAgreeCard] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(paymentMethods)
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethods.filter((payment) => payment.default_payment_method)[0]?.id,
  )
  const [confirmDetach, setConfrimDetach] = useState(false)
  const [isDetachLoading, setIsDetachLoading] = useState(false)
  const [detachPaymentMethodId, setDetachPaymentMethodId] = useState('')

  const subScribe = () => {
    if (agreeCard) {
      toggleSubScribe(paymentMethod)
    }
  }

  const detachPayment = async () => {
    if (detachPaymentMethodId) {
      setIsDetachLoading(true)
      const data = await toggleDetachPaymentMethod(detachPaymentMethodId, partner_customer_uid)
      if (data.has_payment_method) {
        const updatedPaymentMethods = data.data
        if (updatedPaymentMethods.length !== 0) {
          setShowPaymentMethods(updatedPaymentMethods)
          setPaymentMethod(updatedPaymentMethods.filter((payment) => payment.default_payment_method)[0]?.id)
        } else {
          if (slug) router.push(`/add-card-details?slug=${slug}`)
          setConfirmModalOpen(false)
        }
      }
      setConfrimDetach(false)
      setIsDetachLoading(false)
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
          {showPaymentMethods.map((payment) => {
            const expireDate = new Date(payment.exp_year, Number(payment.exp_month) - 1)

            if (expireDate > new Date()) {
              return (
                <div className="flex flex-row justify-between items-center px-4" key={payment.id}>
                  <FormControlLabel
                    value={payment.id}
                    control={<Radio />}
                    label={
                      <div className="flex flex-row items-center">
                        <div className="flex flex-row items-center text-text-primary">
                          <BsCreditCard2Back className="text-lg text-text-primary" />
                          <span className="ml-2 hidden md:flex">**** **** **** {payment.last4}</span>
                          <span className="ml-2 flex md:hidden">**** {payment.last4}</span>
                        </div>
                        <span className="ml-4 text-text-primary">{`${payment.exp_year}/${payment.exp_month}`} exp</span>
                      </div>
                    }
                  />
                  <MdDelete
                    className="text-text-primary text-md hover:cursor-pointer"
                    onClick={() => {
                      setDetachPaymentMethodId(payment.id)
                      setConfrimDetach(true)
                    }}
                  />
                </div>
              )
            }
          })}
        </RadioGroup>
      </div>
      {slug && (
        <a href={`/add-card-details?slug=${slug}`} className="text-sm text-primary">
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
      <Modal
        isOpen={confirmDetach}
        setIsOpen={setConfrimDetach}
        size="lg"
        dialogTitle="Delete Card"
        modalDescription="Are you sure delete this card?"
      >
        <div className="flex flex-row justify-end space-x-2">
          <Button onClick={() => setConfrimDetach(false)}>Cancel</Button>
          <Button
            className="!bg-red-600 !border-red-600"
            textClassName="!text-text-on-surface"
            disabled={!confirmDetach || isDetachLoading}
            loading={isDetachLoading}
            onClick={() => detachPayment()}
          >
            Delete Card
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export const MeteredPaymentMethodConfirm = MeteredPaymentMethodConfirmComponent
