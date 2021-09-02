import React, { Fragment } from 'react'
import { Field, FieldArray, Form, FormikProps } from 'formik'
import * as yup from 'yup'
import clsx, { ClassValue } from 'clsx'
import { Button, Checkbox, Input } from '@taggedweb/ui'
import { BiPlus, BiTrash } from 'react-icons/bi'

export type PricingFormValues = {
  plans: Array<{
    name: string
    hasFreeTrial: boolean
  }>
}

// @TODO: Update min max limits according to api
export const pricingSchema = yup.object().shape({
  plans: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          name: yup
            .string()
            .min(3, 'Plan Name should be atleast 3 chars long')
            .max(24, 'Plan Name should be less than 24 chars')
            .required('Please enter the plan name')
            .label('Plan Name'),
          hasFreeTrial: yup.bool().required().label('Free Trial'),
        })
        .required(),
    )
    .label('Questions'),
})

type PricingFormProps = {
  className?: ClassValue
} & FormikProps<PricingFormValues>

export function PricingForm({ className, touched, errors, values }: PricingFormProps) {
  return (
    <Form className={clsx(className)}>
      <FieldArray
        name="plans"
        render={({ push, remove }) => {
          return (
            <Fragment>
              {values.plans.map((plan, index) => {
                const isLastPlan = values.plans.length === index + 1
                const isSinglePlan = values.plans.length === 1

                const planKey = `plans.${index}`
                const fieldTouched = {
                  name: touched?.plans?.[index]?.name,
                  differentAnnualPricing: touched?.plans?.[index]?.hasFreeTrial,
                }
                const fieldErrors = {
                  // Known bug in formik errors type
                  // Type of error for array of objects is assumed to be string
                  // @ts-expect-error
                  name: errors?.plans?.[index]?.name,
                  differentAnnualPricing: touched?.plans?.[index]?.hasFreeTrial,
                }

                function handleAddPlan() {
                  push({ name: '', hasFreeTrial: false })
                }

                function handleDeletePlan() {
                  if (!isSinglePlan) {
                    remove(index)
                  }
                }

                return (
                  <Fragment key={`${planKey}`}>
                    <label className="block mb-2 font-medium text-gray-800" htmlFor={`${planKey}.name`}>
                      Plan Name
                    </label>
                    <Field
                      id={`${planKey}.name`}
                      className="mb-8"
                      name={`${planKey}.name`}
                      placeholder="Write something..."
                      as={Input}
                      errorMessage={fieldTouched.name ? fieldErrors.name : undefined}
                      success={fieldTouched.name && !fieldErrors.name}
                    />

                    <div className="flex items-center mb-4 space-x-2">
                      <Field
                        id={`${planKey}.hasFreeTrial`}
                        name={`${planKey}.hasFreeTrial`}
                        placeholder="Write something..."
                        as={Checkbox}
                      />
                      <label className="text-sm text-gray-600 " htmlFor={`${planKey}.hasFreeTrial`}>
                        This plan has a free trial.
                      </label>
                    </div>

                    <div className={clsx('flex items-start space-x-2', !isLastPlan && 'mb-10')}>
                      {isLastPlan && (
                        <Button
                          icon={<BiPlus className="text-lg" />}
                          type="button"
                          buttonType="primary"
                          onClick={handleAddPlan}
                        >
                          Add another Price Plan
                        </Button>
                      )}
                      {!isSinglePlan && (
                        <Button
                          className="!space-x-0"
                          type="button"
                          icon={<BiTrash className="text-lg" />}
                          onClick={handleDeletePlan}
                        />
                      )}
                    </div>
                  </Fragment>
                )
              })}
            </Fragment>
          )
        }}
      />
    </Form>
  )
}
