import React, { useState } from 'react'
import { Checkbox } from '../checkbox'
import { InputPriceFilter } from '../price-filter/input-price-filter'

type SortServiceListProps = {
  defaultValue?: string
  onChange: (value: string) => void
  filterByPrice?: (minPrice: string, maxPrice: string) => void
  label?: string
}

export function FilterServiceList({
  defaultValue = '',
  onChange,
  filterByPrice,
  label = 'Trial',
}: SortServiceListProps) {
  const [checked, setChecked] = useState(!!defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)

    if (onChange) {
      if ((event.target as HTMLInputElement).checked) {
        onChange('true')
      } else {
        onChange('')
      }
    }
  }

  return (
    <div className="flex flex-col w-full px-2 py-2">
      <div className="py-2 text-lg font-medium text-text-primary">Pricing</div>
      {filterByPrice && <InputPriceFilter filterByPrice={filterByPrice} />}
      <div className="flex items-center space-x-2">
        <Checkbox size="md" onChange={(e) => handleChange(e)} checked={checked} />
        <div className="text-sm text-text-primary">Free {label}</div>
      </div>
    </div>
  )
}
