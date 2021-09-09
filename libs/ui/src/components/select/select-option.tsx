import React, { forwardRef, ReactNode, Ref } from 'react'
import clsx, { ClassValue } from 'clsx'
import { UseSelectGetItemPropsOptions } from 'downshift'

function getClassNamesByStatus({
  highlighted,
  selected,
  disabled,
}: Record<'highlighted' | 'selected' | 'disabled', boolean>) {
  if (disabled) {
    return 'bg-white cursor-not-allowed text-text-tertiary'
  }
  if (selected) {
    return 'font-semibold text-text-primary bg-secondary'
  }
  if (highlighted) {
    return 'bg-background-default text-text-primary'
  }
  return 'bg-white text-text-secondary'
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
