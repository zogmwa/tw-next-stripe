import React, { useState } from 'react'
import { Checkbox } from '../checkbox'
import { MAX_RELATEDCARDCONTENT_LENGTH } from '../../utils/constants'

function RelatedProductCardComponent({ relatedProduct }) {
  const [checked, setChecked] = useState(relatedProduct.isCompare)

  return (
    <div className="flex flex-col items-center p-4 mt-2 mr-2 border border-solid border-border-default">
      <img src={relatedProduct.imageUrl} alt="Related" className="object-cover rounded-md max-w-16 max-h-16" />
      <span className="mt-4 text-sm text-center text-bold">{relatedProduct.title}</span>
      <span className="mt-4 text-sm text-center text-text-tertiary">
        {relatedProduct?.content.length < MAX_RELATEDCARDCONTENT_LENGTH
          ? relatedProduct?.content
          : `${relatedProduct?.content.substring(0, MAX_RELATEDCARDCONTENT_LENGTH)}...`}
      </span>
      <div className="flex items-center space-x-1.5 mt-4">
        <Checkbox size="md" id={relatedProduct.id} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <label htmlFor={relatedProduct.id} className="text-xs text-text-secondary">
          COMPARE
        </label>
      </div>
    </div>
  )
}

export const RelatedProductCard = RelatedProductCardComponent
