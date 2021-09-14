import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { Textarea } from './textarea'

export default {
  title: 'General/Textarea',
  component: Textarea,
} as Meta

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .min(20, 'Description should be atleast 20 chars long')
    .max(75, 'Description should be less than 75 chars')
    .required('Please enter a description'),
})

export function SimpleTextarea() {
  return (
    <Formik initialValues={{ description: '' }} onSubmit={() => {}} validationSchema={validationSchema}>
      {({ touched, errors }) => (
        <Form>
          <Field
            placeholder="Add a short description..."
            name="description"
            as={Textarea}
            success={touched.description && !errors.description}
            errorMessage={touched.description ? errors.description : undefined}
          />
        </Form>
      )}
    </Formik>
  )
}
