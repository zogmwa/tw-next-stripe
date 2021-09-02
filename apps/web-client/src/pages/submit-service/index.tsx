import React, { useState } from 'react'
import { Formik } from 'formik'
import { Button } from '@taggedweb/ui'
import {
  BasicInformationForm,
  BasicInformationFormValues,
  basicInformationSchema,
} from '../../components/submit-serivce/basic-information-form'
import {
  DetailedInformationForm,
  DetailedInformationFormValues,
  detailedInformationSchema,
} from '../../components/submit-serivce/detailed-information-form'
import { FAQForm, FAQFormValues, faqSchema } from '../../components/submit-serivce/faq-form'
import { PricingForm, PricingFormValues, pricingSchema } from '../../components/submit-serivce/pricing-form'

type FormValues = BasicInformationFormValues & DetailedInformationFormValues & PricingFormValues & FAQFormValues

const initialValues: FormValues = {
  // basic info
  name: '',
  url: '',
  protocol: 'https',
  description: '',
  // detailed info
  detailedDescription: '',
  highlights: ['', ''],
  videoURL: '',
  // pricing
  plans: [
    {
      name: '',
      hasFreeTrial: false,
      features: [''],
      pricings: [{ perUnit: 'month', per: 1, amount: '', currency: 'INR' }],
    },
  ],
  // faq
  questions: [{ question: '', answer: '' }],
}

const steps = [
  {
    heading: 'Basic Information',
    validationSchema: basicInformationSchema,
    Form: BasicInformationForm,
    skippable: true,
  },
  {
    heading: 'Detailed information',
    validationSchema: detailedInformationSchema,
    Form: DetailedInformationForm,
    skippable: true,
  },
  {
    heading: 'Pricing',
    validationSchema: pricingSchema,
    Form: PricingForm,
    skippable: true,
  },
  {
    heading: 'FAQs',
    validationSchema: faqSchema,
    Form: FAQForm,
    skippable: true,
  },
]

export default function SubmitService() {
  const [currentStep, setCurrentStep] = useState(0)
  const { heading, validationSchema, Form, skippable } = steps[currentStep]

  function nextStep() {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  function handleOnSubmit(values: FormValues) {
    const isLastStep = currentStep === steps.length - 1
    if (isLastStep) {
      // @TODO: Make api request
    } else {
      nextStep()
    }
    // eslint-disable-next-line no-console
    console.log(values)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="h-16 mb-12 bg-white border-b border-gray-200" />

      <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
        {(formik) => (
          <>
            <div className="px-4 py-6 mb-4 bg-white border border-gray-200 rounded-lg sm:border-none sm:bg-transparent">
              <h4 className="text-lg font-medium tex-gray-800">{heading}</h4>
              <p className="mb-6 text-sm text-gray-400">
                This information will be displayed publicly so be careful what you share.
              </p>

              <div className="sm:bg-white sm:rounded-lg sm:border sm:border-gray-200 sm:p-6">
                <Form className="md:max-w-lg" {...formik} />
              </div>
            </div>

            <div className="flex justify-end px-4 py-3 mt-auto space-x-4 bg-white border-t border-gray-200 rounded-t-lg sm:bg-transparent sm:border-none">
              {skippable && (
                <Button type="button" onClick={nextStep}>
                  Skip
                </Button>
              )}
              <Button buttonType="primary" onClick={formik.submitForm}>
                Next
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}
