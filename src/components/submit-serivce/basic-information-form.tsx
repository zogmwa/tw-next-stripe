import React from 'react'
import { Field, Form, FormikProps } from 'formik'
import * as yup from 'yup'
import slugify from 'slugify'
import clsx, { ClassValue } from 'clsx'
import { Input } from '../input'
import { Select } from '../select'
import { Textarea } from '../textarea'
import { ImageUploader } from '../image-uploader'

const URL_PROTOCOLS = ['https', 'http'] as const

export type BasicInformationFormValues = {
  name: string
  url: string
  slug: string
  logoUrl: string
  protocol: typeof URL_PROTOCOLS[number]
  shortDescription: string
}

// @TODO: Update min max limits according to api
export const basicInformationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name should be atleast 3 chars long')
    .max(50, 'Name should be less than 50 chars')
    .required('Please enter the name'),
  slug: yup.string().required('Please enter the slug'),
  protocol: yup
    .string()
    .oneOf([...URL_PROTOCOLS])
    .required(),
  url: yup
    .string()
    .matches(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
      'Please enter a valid url',
    )
    .required('Please enter the service url'),
  shortDescription: yup
    .string()
    .min(12, 'Description should be atleast 12 chars long')
    .max(40, 'Description should be less than 40 chars')
    .required('Please enter a description'),
})

type BasicInformationFormProps = {
  className?: ClassValue
  onUploading?: (uploading?: boolean) => void
} & FormikProps<BasicInformationFormValues>

export function BasicInformationForm({
  className,
  touched,
  errors,
  values,
  handleBlur,
  handleChange,
  setFieldValue,
  onUploading,
}: BasicInformationFormProps) {
  return (
    <Form className={clsx(className)}>
      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="name">
        Name
      </label>
      <Input
        id="name"
        className="mb-8"
        name="name"
        placeholder="Write name"
        errorMessage={touched.name ? errors.name : undefined}
        success={touched.name && !errors.name}
        onChange={(event) => {
          const value = event.target.value
          const slug = slugify(value).toLowerCase()
          handleChange('name')(value)
          setFieldValue('slug', slug)
        }}
      />

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="name">
        Slug
      </label>
      <Field
        id="name"
        className="mb-8"
        name="slug"
        placeholder="Enter slug"
        as={Input}
        errorMessage={touched.slug ? errors.slug : undefined}
        success={touched.slug && !errors.slug}
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
        <ImageUploader
          limit={1}
          onChange={(urls) => {
            setFieldValue('logoUrl', urls[0])
          }}
          onUploading={onUploading}
        />
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
