import React, { useState } from 'react'
import { Checkbox } from '../checkbox'
import { MAX_RELATEDCARDCONTENT_LENGTH } from '../../utils/constants'

type RelatedProduct = {
  relatedProduct: any
  handleChecked?: Function
}

function RelatedProductCardComponent({ relatedProduct, handleChecked }: RelatedProduct) {
  const [checked, setChecked] = useState(false)

  const handleCheckedChange = (value, serviceName) => {
    setChecked(value)
    handleChecked(value, serviceName)
  }

  return (
    <div className="flex flex-col items-center p-4 mt-2 mr-2 border border-solid border-border-default">
      <img src={relatedProduct.logo_url} alt={`${relatedProduct.name}`} className="object-cover w-16 h-16 rounded-md" />
      <span className="mt-4 text-sm text-center text-bold">{relatedProduct.name}</span>
      <span className="mt-4 text-sm text-center text-text-tertiary">
        {relatedProduct?.description.length < MAX_RELATEDCARDCONTENT_LENGTH
          ? relatedProduct?.description
          : `${relatedProduct?.description.substring(0, MAX_RELATEDCARDCONTENT_LENGTH)}...`}
      </span>
      <div className="flex items-center space-x-1.5 mt-4">
        <Checkbox
          size="md"
          id={relatedProduct.id}
          checked={checked}
          onChange={(e) => handleCheckedChange(e.target.checked, relatedProduct.slug)}
        />
        <label htmlFor={relatedProduct.id} className="text-xs text-text-secondary">
          COMPARE
        </label>
      </div>
    </div>
  )
}

export const RelatedProductCard = RelatedProductCardComponent
