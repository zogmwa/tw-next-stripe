import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Button } from '../button'

type PaymentCancelComponentProps = {
  className?: string
}

function PaymentCancelComponent({ className = '' }: PaymentCancelComponentProps) {
  const router = useRouter()
  const { session_id, solution } = router.query

  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <img src="/images/danger.png" alt="cancel-image" className="w-32 h-32" />
      <h4 className="my-4 text-3xl font-bold text-text-primary">Canceling</h4>
      <div className="text-lg text-text-tertiary">Do you want to cancel to pay this solutions?</div>
      <Button className="mt-6 bg-primary" textClassName="!text-white" onClick={() => router.push('/')}>
        Yes, find another Solutions
      </Button>
      <Button className="!border-0 mt-2" onClick={() => router.push(`/solution/${solution}`)}>
        No, Procced this Solutions
      </Button>
    </div>
  )
}

export const PaymentCancel = PaymentCancelComponent
