import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Combobox } from './combobox'

export default {
  title: 'General/Combobox',
  component: Combobox,
} as Meta

const items = ['Per Month', 'Per Year', 'Per Week', 'Per Month Per User']

export function ControlledCombobox() {
  const [value, setValue] = useState('')
  const [selectedItem, setSelectedItem] = useState<undefined | null | string>(items[0])

  return (
    <Combobox
      items={items}
      value={value}
      placeholder="Select"
      className="max-w-[240px]"
      onValueChange={setValue}
      selectedItem={selectedItem}
      onSelectedItemChange={({ selectedItem }) => setSelectedItem(selectedItem)}
    />
  )
}

export function ComboboxWithValidation() {
  return (
    <Formik
      initialValues={{ input: '' }}
      // eslint-disable-next-line no-console
      onSubmit={console.log}
      validationSchema={yup.object().shape({
        input: yup.string().min(3).max(24).required().label('Input'),
      })}
    >
      {({ touched, errors, values, handleBlur, setFieldValue }) => {
        return (
          <Combobox
            placeholder="Select"
            items={items}
            value={values.input}
            onValueChange={(value) => setFieldValue('input', value)}
            className="max-w-[240px]"
            errorMessage={touched.input && errors.input ? errors.input : undefined}
            success={touched.input && !errors.input}
            inputProps={{ onBlur: handleBlur('input') }}
          />
        )
      }}
    </Formik>
  )
}
