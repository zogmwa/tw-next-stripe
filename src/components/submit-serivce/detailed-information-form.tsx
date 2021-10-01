import React from 'react'
import { Field, Form, FormikProps } from 'formik'
import * as yup from 'yup'
import clsx, { ClassValue } from 'clsx'
import { Textarea } from '../textarea'
import { Input } from '../input'
import { ImageUploader } from '../image-uploader'

export type DetailedInformationFormValues = {
  description: string
  promoVideo: string | undefined
  snapshots: { asset: number; url: string }[]
}

// @TODO: Update min max limits according to api
export const detailedInformationSchema = yup.object().shape({
  description: yup.string().optional(),
  snapshots: yup.array().of(yup.string()).min(0).max(5).optional(),
  promoVideo: yup.string().optional().url('Please enter a valid url'),
})

type DetailedInformationFormProps = {
  className?: ClassValue
  onUploading?: (uploading?: boolean) => void
} & FormikProps<DetailedInformationFormValues>

export function DetailedInformationForm({
  className,
  touched,
  errors,
  setFieldValue,
  onUploading,
}: DetailedInformationFormProps) {
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

      {/* @TODO: Before deleting the uncommented code, we should move it to a separate component that can be used later
          Key highlights is removed from the initial form, but we should keep it be used on the asset detail page
      */}
      {/* <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary">Key Highlights</label>
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
      /> */}

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary">Screenshots</label>
      <div className="mb-8">
        <ImageUploader
          limit={5}
          onUploading={onUploading}
          onChange={(urls) => {
            setFieldValue('snapshots', urls)
          }}
        />
      </div>

      <label className="block mb-2 text-sm font-medium lg:text-base text-text-primary" htmlFor="description">
        Video URL
      </label>
      <Field
        id="promoVideo"
        className="mb-8"
        name="promoVideo"
        placeholder="https://example.com/video.mp4"
        as={Input}
        errorMessage={touched.promoVideo ? errors.promoVideo : undefined}
        success={touched.promoVideo && !errors.promoVideo}
      />
    </Form>
  )
}
