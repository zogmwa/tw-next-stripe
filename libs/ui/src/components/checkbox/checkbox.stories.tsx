import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Checkbox } from './checkbox'

export default {
  title: 'General/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta

const SimpleTemplate: Story<React.ComponentProps<typeof Checkbox>> = (args) => {
  const [checked, setChecked] = useState(true)
  return <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} {...args} />
}

export const SimpleCheckbox = SimpleTemplate.bind({})
SimpleCheckbox.args = {
  size: 'lg',
}

export function CheckboxWithLabel() {
  return (
    <div className="flex items-center space-x-1.5">
      <Checkbox size="md" id="checkbox" />
      <label htmlFor="checkbox" className="text-gray-600">
        Completed
      </label>
    </div>
  )
}
