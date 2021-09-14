import React, { useState } from 'react'
import { useCombobox, UseComboboxGetInputPropsOptions, UseComboboxProps } from 'downshift'
import clsx from 'clsx'
import { HiChevronDown } from 'react-icons/hi'
import { FormikErrors } from 'formik'

type ComboboxProps = {
  placeholder?: string
  success?: boolean
  errorMessage?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  inputClassName?: string
  buttonClassName?: string
  inputContainerClassName?: string
  inputProps?: UseComboboxGetInputPropsOptions
} & Pick<
  UseComboboxProps<string>,
  'items' | 'initialInputValue' | 'inputValue' | 'selectedItem' | 'onSelectedItemChange'
>

function getComboboxClassNames({ success, errorMessage }: Pick<ComboboxProps, 'success' | 'errorMessage'>) {
  if (success) {
    return 'border-success'
  }
  if (errorMessage) {
    return 'border-error text-error'
  }
  return 'border-border-default'
}

export function Combobox({
  placeholder,
  errorMessage,
  success,
  items,
  value: outerValue,
  onValueChange,
  className,
  inputClassName,
  buttonClassName,
  inputContainerClassName,
  inputProps,
  ...rest
}: ComboboxProps) {
  const [innerValue, setInnerValue] = useState<string | undefined>('')
  const value = outerValue !== undefined ? outerValue : innerValue
  const isValueControlled = outerValue !== undefined
  const inputItems = items.filter((item) => {
    return item.toLowerCase().includes(value ? value.toLowerCase() : '')
  })

  const {
    isOpen,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    inputValue: value,
    onInputValueChange: ({ inputValue = '' }) => {
      if (!isValueControlled) {
        setInnerValue(inputValue)
      }
      onValueChange && onValueChange(inputValue)
    },
    ...rest,
  })

  return (
    <div className={clsx('relative w-full text-sm text-text-secondary', className)}>
      <div
        className={clsx(
          'flex w-full border rounded-lg',
          getComboboxClassNames({ success, errorMessage }),
          inputContainerClassName,
        )}
        {...getComboboxProps()}
      >
        <input
          {...getInputProps({
            placeholder,
            className: clsx('flex-grow rounded-l-[inherit] px-3 py-2 min-w-0', inputClassName),
            ...inputProps,
          })}
        />
        <button
          className={clsx('rounded-r-[inherit] p-2 text-lg text-text-tertiary', buttonClassName)}
          {...getToggleButtonProps()}
        >
          <HiChevronDown className={isOpen ? 'rotate-180' : 'rotate-0'} aria-hidden="true" />
        </button>
      </div>
      {errorMessage && isOpen === false ? <div className="mt-1 text-xs text-error">{errorMessage}</div> : null}
      <ul
        className={clsx(
          'absolute z-10 w-full py-1 mt-1 overflow-y-auto bg-background-surface border border-border-default rounded-lg shadow-sm max-h-60 focus:outline-none',
          isOpen && inputItems.length ? 'block' : 'hidden',
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          inputItems.map((item, index) => {
            const highlighted = highlightedIndex === index

            return (
              <li
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                className={clsx(
                  'px-3 py-2',
                  highlighted ? 'bg-background-default text-text-primary' : 'bg-background-surface',
                )}
              >
                {item}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
