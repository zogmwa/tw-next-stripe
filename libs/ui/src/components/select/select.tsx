import React, { Children, isValidElement, cloneElement, ReactNode, ReactElement } from 'react'
import { useSelect, UseSelectProps } from 'downshift'
import { HiChevronDown } from 'react-icons/hi'
import clsx, { ClassValue } from 'clsx'
import { SelectOption, SelectOptionProps } from './select-option'

type SelectProps<T> = {
  items: T[]
  placeholder?: ReactNode
  renderItem: (item: T) => ReactNode
  disabled?: boolean
  className?: ClassValue
  containerClassName?: ClassValue
  children: ReactElement<SelectOptionProps<T>>[]
} & Pick<UseSelectProps<T>, 'selectedItem' | 'onSelectedItemChange'>

function SelectComponent<T>({
  placeholder = 'Select',
  items,
  selectedItem = undefined,
  onSelectedItemChange,
  renderItem,
  disabled = false,
  className,
  containerClassName,
  children,
}: SelectProps<T>) {
  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect<T>({
    items,
    selectedItem,
    onSelectedItemChange,
  })

  return (
    <div className={clsx('relative w-full', containerClassName)}>
      <button
        type="button"
        className={clsx(
          'flex items-center justify-between w-full px-4 py-3 space-x-3 bg-white border rounded-lg focus-visible:ring-primary/75 focus-visible:ring-2 focus-visible:ring-offset-2',
          disabled ? 'text-gray-400 border-gray-100 cursor-not-allowed' : 'text-gray-600 border-gray-200',
          className,
        )}
        disabled={disabled}
        {...getToggleButtonProps()}
      >
        <span className="truncate">{selectedItem ? renderItem(selectedItem) : placeholder}</span>
        <HiChevronDown
          className={clsx('text-xl pointer-events-none text-gray-400', disabled ? 'text-gray-200' : 'text-gray-400')}
          aria-hidden="true"
        />
      </button>

      <ul
        className={clsx(
          'absolute z-10 w-full overflow-auto bg-white rounded-lg max-h-60 focus:outline-none',
          isOpen && 'py-1 mt-1 border border-gray-200 shadow-sm',
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          Children.map(children, (child, index) => {
            if (isValidElement(child)) {
              const { item, disabled } = child.props
              const itemProps = getItemProps({ item, index, disabled, refKey: '_ref' })
              const _highlighted = highlightedIndex === index
              const _selected = selectedItem === item

              return cloneElement<SelectOptionProps<T>>(child, {
                ...itemProps,
                _highlighted,
                _selected,
              })
            }
            return child
          })}
      </ul>
    </div>
  )
}

export const Select = Object.assign(SelectComponent, {
  Option: SelectOption,
})
