import React, { Children, isValidElement, cloneElement, ReactNode, ReactElement, useMemo } from 'react'
import { useSelect, UseSelectProps } from 'downshift'
import { HiChevronDown } from 'react-icons/hi'
import clsx, { ClassValue } from 'clsx'
import { SelectOption, SelectOptionInternalProps, SelectOptionProps } from './select-option'

interface SelectProps<Item>
  extends Pick<UseSelectProps<Item>, 'items' | 'selectedItem' | 'onSelectedItemChange' | 'initialSelectedItem'> {
  children: ReactNode
  className?: ClassValue
  buttonClassName?: ClassValue
  renderSelectedItem: (selectedItem: Item | null) => ReactNode
  disabled?: boolean
}

function SelectComponent<Item>({
  children,
  className,
  buttonClassName,
  renderSelectedItem,
  disabled = false,
  ...rest
}: SelectProps<Item>) {
  const { isOpen, highlightedIndex, getToggleButtonProps, getMenuProps, getItemProps, selectedItem } = useSelect(rest)

  const options = useMemo(() => {
    // To maintain index of only "Select.Option" components
    let optionIndex = -1

    return Children.map(children, (child) => {
      if (isValidElement(child) && child.type === SelectOption) {
        // When "Select.Option" component is found increment index by one
        optionIndex += 1
        const optionElement = child as ReactElement<SelectOptionProps<Item> & SelectOptionInternalProps<Item>>
        // Forward item prop getter and index needed by getter
        // along with highlighted and selected status for option
        return cloneElement(optionElement, {
          index: optionIndex,
          highlighted: highlightedIndex === optionIndex,
          selected: selectedItem === optionElement.props.item,
          getItemProps,
        })
      }
      return child
    })
  }, [children, getItemProps, highlightedIndex, selectedItem])

  return (
    <div className={clsx('relative w-full', className)}>
      <button
        className={clsx(
          'flex items-center w-full px-4 py-3 space-x-2 text-gray-600 bg-white border border-gray-200 rounded-lg group disabled:text-gray-400',
          buttonClassName,
        )}
        disabled={disabled}
        type="button"
        {...getToggleButtonProps()}
      >
        {renderSelectedItem(selectedItem)}
        <HiChevronDown
          className={clsx(
            'ml-auto text-lg text-gray-400 group-disabled:text-gray-200',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
          aria-hidden="true"
        />
      </button>

      <ul
        className={clsx(
          'absolute z-10 w-full py-1 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-sm max-h-60 focus:outline-none',
          isOpen ? 'block' : 'hidden',
        )}
        {...getMenuProps()}
      >
        {isOpen && options}
      </ul>
    </div>
  )
}

export const Select = Object.assign(SelectComponent, {
  Option: SelectOption,
})
