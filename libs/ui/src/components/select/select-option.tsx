import React, { forwardRef, ReactNode, Ref } from 'react'
import clsx, { ClassValue } from 'clsx'
import { UseSelectGetItemPropsOptions } from 'downshift'

function getClassNamesByStatus({
  highlighted,
  selected,
  disabled,
}: Record<'highlighted' | 'selected' | 'disabled', boolean>) {
  if (disabled) {
    return 'bg-white cursor-not-allowed text-gray-400'
  }
  if (selected) {
    return 'font-semibold text-gray-700 bg-secondary'
  }
  if (highlighted) {
    return 'bg-gray-100 text-gray-700'
  }
  return 'bg-white text-gray-600'
}

export interface SelectOptionProps<Item> {
  item: Item
  children: ReactNode
  className?: ClassValue
  disabled?: boolean
}

export interface SelectOptionInternalProps<Item> {
  highlighted: boolean
  selected: boolean
  index: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemProps: (options: UseSelectGetItemPropsOptions<Item>) => any
}

function SelectOptionComponent<Item>(props: SelectOptionProps<Item>, ref: Ref<HTMLLIElement>) {
  const {
    children,
    className,
    disabled = false,
    // Internal props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    item,
    index,
    highlighted,
    selected,
    getItemProps,
  } = props as SelectOptionProps<Item> & SelectOptionInternalProps<Item>

  return (
    <li
      ref={ref}
      className={clsx(
        'px-4 py-3 truncate select-none',
        getClassNamesByStatus({
          highlighted,
          selected,
          disabled,
        }),
        className,
      )}
      {...getItemProps({ index, item, disabled })}
    >
      {children}
    </li>
  )
}

export const SelectOption = forwardRef(SelectOptionComponent)
