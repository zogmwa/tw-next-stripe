import React, { useState } from 'react'
import { Formik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import {
  BasicInformationForm,
  BasicInformationFormValues,
  basicInformationSchema,
} from '../components/submit-serivce/basic-information-form'
import {
  DetailedInformationForm,
  DetailedInformationFormValues,
  detailedInformationSchema,
} from '../components/submit-serivce/detailed-information-form'
import { createService, CreateServiceInput } from '../queries/service'
import { Service } from '../types/service'
import { Stepper } from '../components/stepper'
import { Button } from '../components/button'

type FormValues = BasicInformationFormValues & DetailedInformationFormValues

const initialValues: FormValues = {
  // basic info
  name: '',
  url: '',
  protocol: 'https',
  shortDescription: '',

  // detailed info
  description: '',
  highlights: ['', ''],
  videoURL: '',
}

const steps = [
  {
    id: 'basic-information',
    heading: 'Basic Information',
    // @TODO: Update description
    description: 'This information will be displayed publicly so be careful what you share.',
    validationSchema: basicInformationSchema,
    Form: BasicInformationForm,
    skippable: false,
  },
  {
    id: 'detailed-information',
    heading: 'Detailed information',
    // @TODO: Update description
    description: 'This information will be displayed publicly so be careful what you share.',
    validationSchema: detailedInformationSchema,
    Form: DetailedInformationForm,
    skippable: true,
  },
]

export default function SubmitService() {
  const [currentStep, setCurrentStep] = useState(0)
  const { heading, description, validationSchema, Form, skippable } = steps[currentStep]

  const { push } = useRouter()

  const queryClient = useQueryClient()
  const { isLoading, mutate } = useMutation((service: CreateServiceInput) => createService(service), {
    onSuccess: (serviceCreated: Service) => {
      queryClient.setQueryData(['services', serviceCreated.slug], serviceCreated)
      push(`/services/${serviceCreated.slug}`)
    },
    onError: (error: any) => {
      // @TODO: get error message from server
      const errorMessage = error?.data?.response?.messages?.[0]?.message ?? 'Something went wrong'
      toast.error(errorMessage)
    },
  })

  function nextStep() {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  function handleOnSubmit(values: FormValues) {
    const isLastStep = currentStep === steps.length - 1
    if (isLastStep) {
      mutate({
        name: values.name,
        website: `${values.protocol}://${values.url}`,
        description: values.description,
        shortDescription: values.shortDescription,
        // @TODO: Add logo url
      })
    } else {
      nextStep()
    }
  }

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="flex items-start max-w-screen-lg mx-auto">
        <Stepper
          steps={steps.map((step) => ({ id: step.id, name: step.heading }))}
          activeIndex={currentStep}
          className="hidden mr-8 md:block"
        />
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
          {(formik) => (
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-base font-medium lg:text-lg text-text-primary">{heading}</h4>
                <p className="mb-6 text-xs lg:text-sm text-text-tertiary">{description}</p>

                <div className="sm:bg-background-surface sm:rounded-lg sm:border sm:border-border-default sm:p-6">
                  <Form className="md:max-w-lg" {...formik} />
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 flex items-center px-4 py-2 space-x-4 border-t md:px-0 md:py-0 md:static bg-background-surface border-border-default sm:bg-transparent sm:border-none">
                {currentStep !== 0 ? (
                  <Button
                    onClick={() => {
                      setCurrentStep((prevState) => Math.max(prevState - 1, 0))
                    }}
                  >
                    Prev
                  </Button>
                ) : null}
                <div className="flex-1" />
                {skippable && currentStep !== steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Skip
                  </Button>
                ) : null}
                <Button buttonType="primary" onClick={formik.submitForm} type="submit" loading={isLoading}>
                  {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  )
}
