import React, { useState } from 'react'
import { Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import {
  BasicInformationForm,
  BasicInformationFormValues,
  basicInformationSchema,
} from '@taggedweb/components/submit-serivce/basic-information-form'
import { createService, CreateServiceInput } from '@taggedweb/queries/service'
import { withPageAuthRequired } from '@taggedweb/utils/auth-wrappers'
import { Asset } from '@taggedweb/types/asset'
import { Button } from '@taggedweb/components/button'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'

type FormValues = BasicInformationFormValues

const initialValues: FormValues = {
  // basic info
  name: '',
  url: '',
  slug: '',
  logoUrl: '',
  protocol: 'https',
  shortDescription: '',
  description: '',
  promoVideo: '',
  snapshots: [],
}

const formInfo = {
  id: 'basic-information',
  heading: 'Basic Information',
  // @TODO: Update description
  description:
    'This information will be displayed publicly so be careful what you share. The detailed information like PricePlans, FaQs, etc. you will be able to add on redirection to product page after successful submit.',
  validationSchema: basicInformationSchema,
  Form: BasicInformationForm,
}
function SubmitService() {
  const { heading, description, validationSchema, Form } = formInfo
  const { push } = useRouter()

  const [uploadingImages, setUploadingImages] = useState(false)

  const queryClient = useQueryClient()
  const { isLoading, mutate } = useMutation((Asset: CreateServiceInput) => createService(Asset), {
    onSuccess: (serviceCreated: Asset) => {
      toast.success('Product Submit Successfully. Redirecting to details page in edit mode.', {
        id: 'product-submit-success',
      })
      queryClient.setQueryData(['services', serviceCreated.slug], serviceCreated)
      push(`/software/${serviceCreated.slug}/edit`)
    },
    onError: (error: any) => {
      // @TODO: get error message from server
      const errorMessage = error?.data?.response?.messages?.[0]?.message ?? 'Something went wrong'
      toast.error(errorMessage, {
        id: 'product-submit-error',
      })
    },
  })

  function handleOnSubmit(values: FormValues) {
    mutate({
      name: values.name,
      slug: values.slug,
      website: `${values.protocol}://${values.url}`,
      description: values.description,
      shortDescription: values.shortDescription,
      logoUrl: values.logoUrl,
      snapshots: values.snapshots,
    })
  }

  return (
    <>
      <DynamicHeader title="TaggedWeb - List a Software" />
      <div className="min-h-full p-4 bg-background-light">
        <div className="flex items-start max-w-screen-lg mx-auto">
          <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
            {(formik) => (
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-base font-medium lg:text-lg text-text-primary">{heading}</h4>
                  <p className="mb-6 text-xs lg:text-sm text-text-tertiary">{description}</p>

                  <div className="sm:bg-background-surface sm:rounded-lg sm:border sm:border-border-default sm:p-6">
                    <Form className="md:max-w-lg" {...formik} onUploading={setUploadingImages} />
                  </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 flex items-center px-4 py-2 space-x-4 border-t md:px-0 md:py-0 md:static bg-background-surface border-border-default sm:bg-transparent sm:border-none">
                  <div className="flex-1" />
                  <Button
                    buttonType="primary"
                    onClick={formik.submitForm}
                    type="submit"
                    loading={isLoading}
                    disabled={uploadingImages}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default withPageAuthRequired(SubmitService, { message: 'Log-in is required to submit a software for listing' })
