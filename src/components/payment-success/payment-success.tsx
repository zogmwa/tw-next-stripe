import React from 'react'
import clsx from 'clsx'
import { Button } from '../button'

type PaymentSuccessComponentProps = {
  emailAddress: string
  className?: string
}

function PaymentSuccessComponent({ emailAddress, className = '' }: PaymentSuccessComponentProps) {
  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <img src="/images/congratulations.png" alt="congratulation-image" className="w-32 h-32" />
      <h4 className="my-4 text-3xl font-bold text-text-primary">Thank you</h4>
      <div className="text-lg text-text-tertiary">
        Your payment was successful. We are on it now. We will follow up with you via email at
      </div>
      <div className="my-2 text-xl font-bold text-text-secondary">{emailAddress}</div>
      <div className="text-lg text-text-tertiary">with in 2 - 3 business days.</div>
      <Button className="mt-4 bg-primary" textClassName="!text-white">
        View Solution Progress
      </Button>
    </div>
  )
}

export const PaymentSuccess = PaymentSuccessComponent
