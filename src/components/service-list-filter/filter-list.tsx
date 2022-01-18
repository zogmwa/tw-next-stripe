import React, { useState } from 'react'
import { Checkbox } from '../checkbox'
import { InputPriceFilter } from '../price-filter/input-price-filter'

type SortServiceListProps = {
  defaultValue?: string
  onChange: (value: string) => void
  filterByPrice?: (minPrice: string, maxPrice: string) => void
  showClearFilter?: boolean
  clearAllPriceFilter?: () => void
  label?: string
}

export function FilterServiceList({
  defaultValue = '',
  onChange,
  filterByPrice,
  showClearFilter,
  clearAllPriceFilter,
  label = 'Trial',
}: SortServiceListProps) {
  const [checked, setChecked] = useState(!!defaultValue)
  //  onClickClearFilter state will toggle on clicking on Reset Filter and
  //  we are calling useEffect on onClickClearFilter in InputPriceFilter Component to erase minPrice and maxPrice
  const [onClickClearFilter, setOnClickClearFilter] = useState(false)

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

  const clearPriceFilter = async () => {
    setOnClickClearFilter(!onClickClearFilter)
    setChecked(false)
    await clearAllPriceFilter()
  }

  return (
    <div className="flex flex-col w-full px-2 py-2">
      <div className="flex items-center justify-between py-2 font-medium text-text-primary">
        <div className="text-lg">Pricing</div>
        {showClearFilter && (
          <p onClick={clearPriceFilter} className="text-sm text-blue-500 cursor-pointer">
            Reset Filter
          </p>
        )}
      </div>
      {filterByPrice && <InputPriceFilter onClickClearFilter={onClickClearFilter} filterByPrice={filterByPrice} />}
      <div className="flex items-center space-x-2">
        <Checkbox size="md" onChange={(e) => handleChange(e)} checked={checked} />
        <div className="text-sm text-text-primary">Offers Free {label}</div>
      </div>
    </div>
  )
}
