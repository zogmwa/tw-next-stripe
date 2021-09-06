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
          'flex items-center w-full px-4 py-3 space-x-2 text-text-secondary bg-white border border-border-default rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/75 focus:outline-none group disabled:text-text-tertiary text-sm',
          buttonClassName,
        )}
        disabled={disabled}
        {...getToggleButtonProps()}
      >
        {renderSelectedItem(selectedItem)}
        <HiChevronDown
          className={clsx(
            'ml-auto text-lg text-text-tertiary group-disabled:opacity-50',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
          aria-hidden="true"
        />
      </button>

      <ul
        className={clsx(
          'absolute z-10 w-full py-1 mt-1 overflow-y-auto bg-white border border-border-default rounded-lg shadow-sm max-h-60 focus:outline-none text-sm',
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
