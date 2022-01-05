import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Button } from '../button'

type PaymentCancelComponentProps = {
  className?: string
}

function PaymentCancelComponent({ className = '' }: PaymentCancelComponentProps) {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { session_id, solution } = router.query

  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <img src="/images/danger.png" alt="cancel-image" className="w-32 h-32" />
      <h4 className="my-4 text-3xl font-bold text-text-primary">Canceling</h4>
      <div className="text-lg text-text-tertiary">Do you want to stop booking this solution?</div>
      <Button
        className="mt-6 bg-primary"
        textClassName="!text-white"
        onClick={() => router.push('/?search_software=0')}
      >
        Find other solutions.
      </Button>
      <Button className="!border-0 mt-2" onClick={() => router.push(`/solution/${solution}`)}>
        No, continue with this solution.
      </Button>
    </div>
  )
}

export const PaymentCancel = PaymentCancelComponent
