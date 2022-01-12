import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Button } from '../button'

type PaymentCancelComponentProps = {
  className?: string
}

function PaymentCancelComponent({ className = '' }: PaymentCancelComponentProps) {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { solution } = router.query
  let referralUserId = (router.query?.r as string) ?? ''
  let url = `/solution/${solution}`
  if (referralUserId) url += `?r=${referralUserId}`

  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <img src="/images/danger.png" alt="Cancel-Image" className="w-32 h-32" />
      <h4 className="my-4 text-3xl font-bold text-text-primary">Canceling</h4>
      <div className="text-lg text-text-tertiary">Do you want to stop booking this solution?</div>
      <Link href={'/?search_software=0'} passHref>
        <a>
          <Button className="mt-6 bg-primary" textClassName="!text-white">
            Find other solutions.
          </Button>
        </a>
      </Link>
      <Link href={url} passHref>
        <Button className="!border-0 mt-2">No, continue with this solution.</Button>
      </Link>
    </div>
  )
}

export const PaymentCancel = PaymentCancelComponent
