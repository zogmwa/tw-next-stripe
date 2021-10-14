import React from 'react'
import { Checkbox } from '../checkbox'

type SortServiceListProps = {
  defaultValue?: string
  onChange: (value: string) => void
}

export function FilterServiceList({ defaultValue = '', onChange }: SortServiceListProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="flex items-center space-x-2">
        <Checkbox size="md" onChange={handleChange} checked={!!defaultValue} />
        <div className="text-sm text-text-primary">Free Trial</div>
      </div>
    </div>
  )
}
