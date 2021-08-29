import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Select } from '../select'

export default {
  title: 'General/Select',
  component: Select,
} as Meta

const items = [
  { id: '1', text: '🌊 Wave', disabled: false },
  { id: '3', text: '🐶 Dog', disabled: false },
  { id: '4', text: '🦄 Unicorn', disabled: true },
  { id: '5', text: '💎 Diamond', disabled: false },
]

type Item = typeof items[0]

export function SimpleSelect() {
  const [selectedItem, setSelectedItem] = useState<Item | null | undefined>(items[0])

  return (
    <Select
      items={items}
      className="max-w-[296px]"
      selectedItem={selectedItem}
      onSelectedItemChange={({ selectedItem }) => setSelectedItem(selectedItem)}
      renderSelectedItem={(item) => item?.text ?? 'Select'}
    >
      {items.map((item) => (
        <Select.Option item={item} key={item.id}>
          {item.text}
        </Select.Option>
      ))}
    </Select>
  )
}

export function SelectWithDisabledOption() {
  return (
    <Select items={items} className="max-w-[296px]" renderSelectedItem={(item) => item?.text ?? '✨ Select an Emoji'}>
      {items.map((item) => (
        <Select.Option item={item} key={item.id} disabled={item.disabled}>
          {item.text}
        </Select.Option>
      ))}
    </Select>
  )
}

export function SelectDisabled() {
  return (
    <Select
      items={items}
      className="max-w-[296px]"
      initialSelectedItem={items[2]}
      renderSelectedItem={(item) => item?.text ?? '✨ Select an Emoji'}
      disabled={true}
    >
      {items.map((item) => (
        <Select.Option key={item.id} item={item} disabled={item.disabled}>
          {item.text}
        </Select.Option>
      ))}
    </Select>
  )
}
