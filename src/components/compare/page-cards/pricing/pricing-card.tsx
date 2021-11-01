import React, { useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import { AiFillCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { Asset } from '../../../../types/asset'
import { Modal } from '../../../Modal'
import { PricingContent } from '../../../service-detail/pricing-content'

type CompareServicePricingCardProps = {
  service: Asset
  showPricingData: { asset: number; price: any }[]
}

function CompareServicePricingCardComponent({ service, showPricingData }: CompareServicePricingCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (showPricingData === []) return null

  const trialDays = service.trial_days ?? 0

  return (
    <div className="flex flex-col p-4" key={service.id}>
      <h2 className="text-black text-md text-semibold">{service.name} Pricing</h2>
      <div className="flex items-end justify-between mt-2">
        <h2 className="text-black text-md text-semibold">Starting from</h2>
        <span className="text-xs cursor-pointer text-text-tertiary" onClick={() => setIsOpen(true)}>
          view pricing details
        </span>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="2xl" dialogTitle="Pricing details">
          <PricingContent service={service} isShowTitle={false} />
        </Modal>
      </div>
      <div className="flex items-end mt-2">
        <BiDollar className="text-xl text-text-secondary" />
        <div className="flex content-end text-2xl">
          {showPricingData.filter((price) => price.asset === service.id)[0].price?.price ?? null}
        </div>
        <div className="pl-2 text-text-secondary">
          /{showPricingData.filter((price) => price.asset === service.id)[0].price?.per ?? null}
        </div>
      </div>
      <div className="flex items-center mt-4">
        <h2 className="text-sm text-black text-semibold">Pricing Model:</h2>
        <div className="pl-2 text-sm">
          {showPricingData.filter((price) => price.asset === service.id)[0].price?.name ?? null}
        </div>
      </div>
      <div className="flex flex-col mt-1">
        {service.has_free_trial ? (
          <div className="flex items-center mt-2 align-center">
            <AiFillCheckCircle className=" text-primary text-md" />
            <div className="pl-1 text-xs">Free Trial{trialDays !== 0 && ` / ${trialDays} Days`}</div>
          </div>
        ) : (
          <div className="flex items-center mt-2 align-center">
            <AiOutlineCloseCircle className=" text-text-tertiary text-md" />
            <div className="pl-1 text-xs">Free Trial</div>
          </div>
        )}
      </div>
    </div>
  )
}

export const CompareServicePricingCard = CompareServicePricingCardComponent
