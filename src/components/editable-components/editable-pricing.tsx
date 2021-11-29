import React, { useState, useEffect } from 'react'
import { Plan } from '@taggedweb/types/price-plan'
import { EditablePricingTable } from './editable-table'
import { Button } from '../button'

type EditablePricingComponentProps = {
  pricePlans: Plan[]
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: Function
}

function EditablePricingComponent({ pricePlans, setEditModal, onSubmit }: EditablePricingComponentProps) {
  const [editPricePlans, setEditPricePlans] = useState(pricePlans)
  const [isSubmit, setIsSubmit] = useState(false)
  const defaultPriceData = {
    name: '',
    summary: '',
    currency: '',
    price: 0,
    per: 'Month',
    features: [''],
    most_popular: false,
  }

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false)
      let isSend = true
      for (let i = 0; i < editPricePlans.length; i++) {
        if (editPricePlans[i].name === '' || editPricePlans[i].currency === '') isSend = false
      }
      if (isSend) onSubmit({ price_plans: editPricePlans })
      setEditModal(false)
    }
  }, [isSubmit])

  return (
    <>
      <EditablePricingTable
        pricePlans={editPricePlans}
        defaultPriceData={defaultPriceData}
        setEditPricePlans={setEditPricePlans}
        isSubmit={isSubmit}
      />
      <div className="flex flex-row-reverse">
        <Button className="ml-4" buttonType="primary" type="submit" onClick={() => setIsSubmit(true)}>
          Add
        </Button>
        <Button buttonType="default" type="submit" onClick={() => setEditModal(false)}>
          Cancel
        </Button>
      </div>
    </>
  )
}

export const EditablePricing = EditablePricingComponent
