import React, { KeyboardEvent } from 'react'
import { Field, FieldArray, Form, FormikProps } from 'formik'
import { Button, FilesDropzone, Input, Textarea } from '@taggedweb/ui'
import { BiPlus } from 'react-icons/bi'
import * as yup from 'yup'
import clsx, { ClassValue } from 'clsx'
import { HiOutlineLogout } from 'react-icons/hi'

export type DetailedInformationFormValues = {
  description: string
  highlights: string[]
  videoURL: string | undefined
}

// @TODO: Update min max limits according to api
export const detailedInformationSchema = yup.object().shape({
  description: yup.string().optional(),
  highlights: yup.array().of(yup.string()),
  videoURL: yup.string().optional().url('Please enter a valid url'),
})

type DetailedInformationFormProps = {
  className?: ClassValue
} & FormikProps<DetailedInformationFormValues>

export function DetailedInformationForm({ className, touched, errors, values }: DetailedInformationFormProps) {
  return (
    <Form className={clsx(className)}>
      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="description">
        Detailed Description
      </label>
      <Field
        id="description"
        className="mb-8"
        name="description"
        placeholder="Write detailed description..."
        as={Textarea}
        errorMessage={touched.description ? errors.description : undefined}
        success={touched.description && !errors.description}
      />

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary">Key Highlights</label>
      <FieldArray
        name="highlights"
        render={({ push, remove }) => {
          function addHighlight() {
            push('')
          }

          return (
            <>
              {values.highlights.map((highlight, index) => {
                const isLastHighlightField = index + 1 === values.highlights.length

                function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
                  if (event.key === 'Enter' && highlight !== '' && isLastHighlightField) {
                    addHighlight()
                  }
                  if (event.key === 'Delete' && highlight === '' && values.highlights.length > 1) {
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
                <Button
                  type="button"
                  className="!space-x-0 !p-1"
                  icon={<BiPlus className="text-xl" />}
                  onClick={addHighlight}
                />
                <p className="text-xs font-normal text-text-tertiary">
                  Pressing Enter
                  <HiOutlineLogout className="inline mx-1 text-base text-primary" />
                  will also add a new row
                </p>
              </div>
            </>
          )
        }}
      />

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary">Screenshots</label>
      <div className="mb-8">
        <FilesDropzone />
      </div>

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="description">
        Video URL
      </label>
      <Field
        id="videoURL"
        className="mb-8"
        name="videoURL"
        placeholder="https://example.com/video.mp4"
        as={Input}
        errorMessage={touched.videoURL ? errors.videoURL : undefined}
        success={touched.videoURL && !errors.videoURL}
      />
    </Form>
  )
}
