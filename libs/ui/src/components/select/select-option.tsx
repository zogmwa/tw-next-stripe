import React, { ReactNode, Ref } from 'react'
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

export type SelectOptionProps<T> = {
  className?: ClassValue
  children?: ReactNode
  _highlighted?: boolean
  _selected?: boolean
  _ref?: Ref<HTMLLIElement>
} & Omit<UseSelectGetItemPropsOptions<T>, 'ref'>

export function SelectOption<T>({
  _highlighted = false,
  _selected = false,
  children,
  className,
  _ref,
  ...rest
}: SelectOptionProps<T>) {
  return (
    <li
      ref={_ref}
      className={clsx(
        'px-4 py-2 truncate select-none',
        getClassNamesByStatus({ highlighted: _highlighted, selected: _selected, disabled: Boolean(rest.disabled) }),
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  )
}
