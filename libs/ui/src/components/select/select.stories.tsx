import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Select } from '../select'

export default {
  title: 'General/Select',
  component: Select,
} as Meta

const items = [
  { id: '1', text: '🌊 Wave', disabled: false },
  { id: '2', text: '🌸 Flower', disabled: false },
  { id: '3', text: '🐶 Dog', disabled: false },
  { id: '4', text: '🦄 Unicorn', disabled: true },
  { id: '5', text: '💎 Diamond', disabled: false },
]

type Item = typeof items[0]

export function SimpleSelect() {
  const [selectedItem, setSelectedItem] = useState<Item | null | undefined>(items[0])

  return (
    <Select
      containerClassName="max-w-[296px]"
      items={items}
      selectedItem={selectedItem}
      renderItem={(value) => value.text}
      onSelectedItemChange={({ selectedItem }) => setSelectedItem(selectedItem)}
    >
      {items.map((item) => (
        <Select.Option key={item.id} item={item}>
          {item.text}
        </Select.Option>
      ))}
    </Select>
  )
}

export function SelectWithDisabledOption() {
  const [selectedItem, setSelectedItem] = useState<Item | null | undefined>(null)

  return (
    <Select
      placeholder="✨ Select Emoji"
      containerClassName="max-w-[296px]"
      items={items}
      selectedItem={selectedItem}
      renderItem={(value) => value.text}
      onSelectedItemChange={({ selectedItem }) => setSelectedItem(selectedItem)}
    >
      {items.map((item) => (
        <Select.Option key={item.id} item={item} disabled={item.disabled}>
          {item.text}
        </Select.Option>
      ))}
    </Select>
  )
}

export function SelectDisabled() {
  const [selectedItem, setSelectedItem] = useState<Item | null | undefined>(items[3])

  return (
    <Select
      containerClassName="max-w-[296px]"
      items={items}
      renderItem={(value) => value.text}
      selectedItem={selectedItem}
      onSelectedItemChange={({ selectedItem }) => setSelectedItem(selectedItem)}
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
