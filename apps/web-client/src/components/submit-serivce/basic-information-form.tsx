import React from 'react'
import { Field, Form, FormikProps } from 'formik'
import { FilesDropzone, Input, Select, Textarea } from '@taggedweb/ui'
import * as yup from 'yup'
import clsx, { ClassValue } from 'clsx'

const URL_PROTOCOLS = ['https', 'http'] as const

export type BasicInformationFormValues = {
  name: string
  url: string
  protocol: typeof URL_PROTOCOLS[number]
  shortDescription: string
}

// @TODO: Update min max limits according to api
export const basicInformationSchema = yup.object().shape({
  name: yup.string(),
  // .min(3, 'Name should be atleast 3 chars long')
  // .max(50, 'Name should be less than 50 chars')
  // .required('Please enter the name'),
  protocol: yup.string().oneOf([...URL_PROTOCOLS]),
  // .required(),
  url: yup
    .string()
    .matches(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
      'Please enter a valid url',
    ),
  // .required('Please enter the service url'),
  shortDescription: yup.string(),
  // .min(12, 'Description should be atleast 12 chars long')
  // .max(40, 'Description should be less than 40 chars')
  // .required('Please enter a description'),
})

type BasicInformationFormProps = {
  className?: ClassValue
} & FormikProps<BasicInformationFormValues>

export function BasicInformationForm({
  className,
  touched,
  errors,
  values,
  handleBlur,
  handleChange,
  setFieldValue,
}: BasicInformationFormProps) {
  return (
    <Form className={clsx(className)}>
      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="name">
        Name
      </label>
      <Field
        id="name"
        className="mb-8"
        name="name"
        placeholder="Write name"
        as={Input}
        errorMessage={touched.name ? errors.name : undefined}
        success={touched.name && !errors.name}
      />

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="url">
        URL
      </label>
      <div className="flex w-full mb-8">
        <Select
          items={[...URL_PROTOCOLS]}
          selectedItem={values.protocol}
          onSelectedItemChange={({ selectedItem }) => setFieldValue('protocol', selectedItem, true)}
          renderSelectedItem={(protocol) => `${protocol}://`}
          className="w-24 text-sm"
          buttonClassName="!px-3 !py-2 rounded-l-md rounded-r-none !bg-background-default border-r-border-default"
        >
          {URL_PROTOCOLS.map((protocol) => (
            <Select.Option item={protocol} key={protocol} className="!px-3 !py-2">
              {protocol}://
            </Select.Option>
          ))}
        </Select>
        <Input
          id="url"
          name="url"
          className="flex-grow"
          inputClassName="rounded-l-none"
          placeholder="www.example.com"
          errorMessage={touched.url ? errors.url : undefined}
          success={touched.url && !errors.url}
          onBlur={handleBlur('url')}
          onChange={handleChange('url')}
        />
      </div>

      {/* @TODO Build drag & drop upload component */}
      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="logo">
        Logo
      </label>
      <div className="flex items-center mb-8 space-x-6 text-xs">
        <FilesDropzone />
      </div>

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="description">
        Short Description
      </label>
      <Field
        id="shortDescription"
        name="shortDescription"
        placeholder="Add a short description..."
        as={Textarea}
        errorMessage={touched.shortDescription ? errors.shortDescription : undefined}
        success={touched.shortDescription && !errors.shortDescription}
      />
    </Form>
  )
}
