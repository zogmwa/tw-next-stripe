import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Input } from './input'

export default {
  title: 'General/Input',
  component: Input,
} as Meta

const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please enter a password'),
})

export function PasswordInput() {
  return (
    <Formik initialValues={{ password: '' }} onSubmit={() => {}} validationSchema={passwordValidationSchema}>
      {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm text-gray-700" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter password"
            id="password"
            success={touched.password && !errors.password}
            errorMessage={touched.password ? errors.password : undefined}
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
          />
        </form>
      )}
    </Formik>
  )
}
