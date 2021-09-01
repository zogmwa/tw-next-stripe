import React, { KeyboardEvent } from 'react'
import { Field, FieldArray, Form, FormikProps } from 'formik'
import { Button, Input, Textarea } from '@taggedweb/ui'
import { BiImageAdd, BiPlus } from 'react-icons/bi'
import * as yup from 'yup'
import clsx, { ClassValue } from 'clsx'
import { HiOutlineLogout } from 'react-icons/hi'

const VALID_LOGO_TYPES = ['png', 'jpg', 'gif'] as const
const MAX_IMAGE_SIZE = 2e6 // in bytes

export type DetailedInformationFormValues = {
  detailedDescription: string
  highlights: string[]
  videoURL: string | undefined
}

// @TODO: Update min max limits according to api
export const detailedInformationSchema = yup.object().shape({
  detailedDescription: yup
    .string()
    .min(20, 'Description should be atleast 20 chars long')
    .max(75, 'Description should be less than 75 chars')
    .required('Please enter a description'),
  highlights: yup.array().of(yup.string()),
  videoURL: yup.string().url().label('Video URL'),
})

type DetailedInformationFormProps = {
  className?: ClassValue
} & FormikProps<DetailedInformationFormValues>

export function DetailedInformationForm({ className, touched, errors, values }: DetailedInformationFormProps) {
  return (
    <Form className={clsx(className)}>
      <label className="block mb-2 font-medium text-gray-800" htmlFor="detailedDescription">
        Detailed Description
      </label>
      <Field
        id="detailedDescription"
        className="mb-8"
        name="detailedDescription"
        placeholder="Write detailed description..."
        as={Textarea}
        errorMessage={touched.detailedDescription ? errors.detailedDescription : undefined}
        success={touched.detailedDescription && !errors.detailedDescription}
      />

      <label className="block mb-2 font-medium text-gray-800">Key Highlights</label>
      <FieldArray
        name="highlights"
        render={({ push, remove }) => (
          <>
            {values.highlights.map((highlight, index) => {
              const isLastHighlightField = index + 1 === values.highlights.length

              function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
                if (event.key === 'Enter' && highlight !== '' && isLastHighlightField) {
                  push('')
                }
                if (event.key === 'Delete' && highlight === '' && index !== 0) {
                  remove(index)
                }
              }

              return (
                <Field
                  className="max-w-sm mb-3"
                  key={index}
                  name={`highlights.${index}`}
                  placeholder={`Highlight ${index + 1}`}
                  as={Input}
                  onKeyDown={handleOnKeyDown}
                />
              )
            })}
            <div className="flex items-center mb-8 space-x-4">
              <Button type="button" className="!space-x-0 !p-1" icon={<BiPlus className="text-xl" />} />
              <p className="text-xs font-normal text-gray-400">
                Pressing Enter
                <HiOutlineLogout className="inline mx-1 text-base text-primary" />
                will also add a new row
              </p>
            </div>
          </>
        )}
      />

      <label className="block mb-2 font-medium text-gray-800">Screenshots</label>
      {/* @TODO Build drag & drop upload component */}
      <div className="grid grid-cols-2 gap-4 mb-3 sm:flex">
        {[1, 2].map((preview) => (
          <div
            key={preview}
            className="flex items-center justify-center flex-shrink-0 border border-gray-200 border-dashed rounded-lg sm:w-24 sm:h-24 aspect-w-1 aspect-h-1 sm:aspect-none"
          >
            <BiImageAdd className="w-1/4 m-auto text-gray-500 sm:text-3xl h-1/4" />
          </div>
        ))}
      </div>
      <div className="flex items-center mb-8 space-x-4">
        <Button type="button" className="!space-x-0 !p-1" icon={<BiPlus className="text-xl" />} />
        <p className="text-xs max-w-[200px] text-gray-400 font-normal">
          <span className="font-medium text-primary">Upload a file</span> or drag and drop{' '}
          <span className="uppercase">{VALID_LOGO_TYPES.join(', ')}</span> up to {(MAX_IMAGE_SIZE / 1e6).toFixed(0)}mb
        </p>
      </div>

      <label className="block mb-2 font-medium text-gray-800" htmlFor="detailedDescription">
        Video URL
      </label>
      <Field
        id="videoURL"
        className="mb-8"
        name="videoURL"
        placeholder="https://example.com/vidoe.mp4"
        as={Input}
        errorMessage={touched.videoURL ? errors.videoURL : undefined}
        success={touched.videoURL && !errors.videoURL}
      />
    </Form>
  )
}
