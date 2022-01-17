import React, { useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Button } from '../button'
import { Checkbox } from '../checkbox'

type MeteredPaymentMethodConfirmComponentProps = {
  className?: string
  title: string
  slug?: string
  setConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSubScribe: Function
}

function MeteredPaymentMethodConfirmComponent({
  title,
  slug,
  className,
  setConfirmModalOpen,
  toggleSubScribe,
}: MeteredPaymentMethodConfirmComponentProps) {
  const router = useRouter()
  const [agreeTerms, setAgreeTerms] = useState(false)

  const subScribe = () => {
    if (!agreeTerms) {
      toggleSubScribe()
    }
  }

  return (
    <div className={clsx('flex flex-col ', className)}>
      <h2
        className="text-md text-text-primary font-semibold my-4"
        onClick={() => {
          if (slug) router.push(`/solution/${slug}`)
        }}
      >
        {title}
      </h2>
      <div className="flex items-center space-x-1.5 my-6">
        <Checkbox
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          size="md"
          id="terms-of-service"
        />
        <label htmlFor="terms-of-service" className="text-sm text-text-secondary">
          I agree with
          {/* We should add terms of service url to below anchor tag. */}
          <a href="#" className="ml-1 underline">
            terms of service
          </a>
        </label>
      </div>
      <div className="flex flex-row justify-end space-x-2">
        <Button onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
        <Button
          className="bg-primary"
          textClassName="!text-text-on-surface"
          disabled={!agreeTerms}
          onClick={() => subScribe()}
        >
          Subscribe
        </Button>
      </div>
    </div>
  )
}

export const MeteredPaymentMethodConfirm = MeteredPaymentMethodConfirmComponent
