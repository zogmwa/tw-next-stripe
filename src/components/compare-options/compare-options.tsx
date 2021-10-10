import React from 'react'
import { Button } from '../button'
import { RelatedProductCard } from '../related-product-card/related-product-card'

function CompareOptionsComponent({ options }) {
  const MAX_COMPARABLE_OPTIONS = 4

  return (
    <div>
      <div className="font-bold">Compare Products</div>
      <div
        className={`grid justify-items-center grid-cols-${MAX_COMPARABLE_OPTIONS} md:grid-cols-${
          options.length <= MAX_COMPARABLE_OPTIONS ? options.length : 4
        } mt-4 mb-4`}
      >
        {options.map((relatedProduct, index) => (
          <RelatedProductCard relatedProduct={relatedProduct} key={index} />
        ))}
      </div>
      <div className="flex flex-row-reverse">
        <Button className="ml-4" buttonType="primary" type="submit">
          Compare Now
        </Button>
        <Button buttonType="default" type="submit">
          Cancel
        </Button>
      </div>
    </div>
  )
}

export const CompareOptions = CompareOptionsComponent
