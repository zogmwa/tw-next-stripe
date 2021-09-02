import React, { Fragment, KeyboardEvent } from 'react'
import { Field, FieldArray, Form, FormikProps } from 'formik'
import * as yup from 'yup'
import clsx, { ClassValue } from 'clsx'
import { Button, Checkbox, Input, Select, Switch } from '@taggedweb/ui'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import getKeys from '../../utils/getKeys'

const PRICING_PER_UNITS = ['month', 'user'] as const
const PRICING_PER_OPTIONS: Record<
  Pricing['perUnit'],
  Array<{
    value: number | string
    label: string
  }>
> = {
  month: [
    { value: 1, label: 'Month' },
    { value: 4, label: 'Quarter' },
    { value: 6, label: '6 Months' },
    { value: 12, label: 'Year' },
  ],
  user: [
    { value: '0:50', label: '0 - 50' },
    { value: '50:100', label: '50 - 100' },
    { value: '100:500', label: '100 - 500' },
    { value: '500+', label: '500+ Members' },
  ],
}

const CURRENCIES = {
  INR: {
    symbol: '₹',
  },
  USD: {
    symbol: '$',
  },
}

type Pricing = {
  perUnit: typeof PRICING_PER_UNITS[number]
  per: string | number
  amount: string
  currency: keyof typeof CURRENCIES
}

type Plan = {
  name: string
  hasFreeTrial: boolean
  features: string[]
  pricings: Pricing[]
}

export type PricingFormValues = {
  plans: Plan[]
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
          pricings: yup.array().of(
            yup.object().shape({
              perUnit: yup
                .string()
                .oneOf([...PRICING_PER_UNITS])
                .label('Per Unit'),
              per: yup.mixed(),
              amount: yup.number().min(0).max(10000).required().label('Price'),
              currency: yup.string().oneOf(getKeys(CURRENCIES)).required().label('Currency'),
            }),
          ),
          features: yup.array().of(yup.string().min(3).max(20).label('Feature')).label('Features'),
        })
        .required(),
    )
    .label('Questions'),
})

type PricingFormProps = {
  className?: ClassValue
} & FormikProps<PricingFormValues>

export function PricingForm({ className, touched, errors, values, setFieldValue }: PricingFormProps) {
  return (
    <Form className={clsx(className)}>
      <FieldArray
        name="plans"
        render={({ push: pushPlan, remove: removePlan }) => {
          return (
            <Fragment>
              {values.plans.map((plan, planIndex) => {
                const isLastPlan = values.plans.length === planIndex + 1
                const isSinglePlan = values.plans.length === 1

                const planKey = `plans.${planIndex}`
                const planFieldTouched = {
                  name: touched?.plans?.[planIndex]?.name,
                  hasFreeTrial: touched?.plans?.[planIndex]?.hasFreeTrial,
                  pricings: touched?.plans?.[planIndex]?.pricings,
                }
                const planFieldError = {
                  // Known bug in formik errors type
                  // Type of error for array of objects is assumed to be string
                  // @ts-expect-error
                  name: errors?.plans?.[planIndex]?.name,
                  // @ts-expect-error
                  hasFreeTrial: errors?.plans?.[planIndex]?.hasFreeTrial,
                  // @ts-expect-error
                  pricings: errors?.plans?.[planIndex]?.pricings,
                }

                function handleAddPlan() {
                  pushPlan({
                    name: '',
                    hasFreeTrial: false,
                    features: [''],
                    pricings: [{ amount: '', currency: 'INR', perUnit: 'month' }],
                  } as Plan)
                }

                function handleDeletePlan() {
                  if (!isSinglePlan) {
                    removePlan(planIndex)
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
                      errorMessage={planFieldTouched.name ? planFieldError.name : undefined}
                      success={planFieldTouched.name && !planFieldError.name}
                    />

                    <FieldArray
                      name={`${planKey}.pricings`}
                      render={({ push: pushPricing, remove: removePricing }) => {
                        function addPricing() {
                          pushPricing({
                            perUnit: 'month',
                            per: PRICING_PER_OPTIONS.month[0].value,
                            amount: '',
                            currency: 'INR',
                          } as Pricing)
                        }

                        return (
                          <div className="mb-8">
                            {values.plans[planIndex].pricings.map((pricing, pricingIndex) => {
                              const pricingKey = `${planKey}.pricings.${pricingIndex}`
                              const pricingsLength = values.plans[planIndex].pricings.length
                              const pricingFieldTouched = {
                                amount: planFieldTouched?.pricings?.[pricingIndex]?.amount,
                                currency: planFieldTouched?.pricings?.[pricingIndex]?.currency,
                              }
                              const pricingFieldError = {
                                amount: planFieldError?.pricings?.[pricingIndex]?.amount,
                              }

                              function handleRemovePricing() {
                                if (pricingsLength > 1) {
                                  removePricing(pricingIndex)
                                }
                              }

                              return (
                                <div key={pricingKey} className="flex mb-3 space-x-4">
                                  <div className="flex-1">
                                    <label
                                      className="block mb-2 font-medium text-gray-800"
                                      htmlFor={`${pricingKey}.amount`}
                                    >
                                      Price
                                    </label>
                                    <div>
                                      <div className="flex w-full">
                                        <Select
                                          items={getKeys(CURRENCIES)}
                                          selectedItem={pricing.currency}
                                          renderSelectedItem={(currency) => CURRENCIES[currency].symbol}
                                          onSelectedItemChange={({ selectedItem }) =>
                                            setFieldValue(`${pricingKey}.currency`, selectedItem)
                                          }
                                          className="flex-shrink-0 text-sm w-14"
                                          buttonClassName="!px-3 !py-2 rounded-l-md rounded-r-none bg-gray-100 border-r-gray-300"
                                        >
                                          {getKeys(CURRENCIES).map((currency) => (
                                            <Select.Option item={currency} key={currency} className="!px-3 !py-2">
                                              {CURRENCIES[currency].symbol}
                                            </Select.Option>
                                          ))}
                                        </Select>
                                        <Field
                                          id={`${pricingKey}.amount`}
                                          inputClassName="rounded-l-none"
                                          name={`${pricingKey}.amount`}
                                          placeholder="Amount"
                                          as={Input}
                                          type="number"
                                          errorMessage={
                                            pricingFieldTouched.amount ? pricingFieldError.amount : undefined
                                          }
                                          success={pricingFieldTouched.amount && !pricingFieldError.amount}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2 ">
                                      <label className="block font-medium text-gray-800" htmlFor={`${pricingKey}.per`}>
                                        Per
                                      </label>
                                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <span
                                          className={clsx(
                                            'min-w-[60px] text-right',
                                            pricing.perUnit === 'month' && 'text-primary font-semibold',
                                          )}
                                        >
                                          Duration
                                        </span>
                                        <Switch
                                          className={'!bg-blue-200'}
                                          circleClassname={'!bg-primary'}
                                          enabled={pricing.perUnit === 'user'}
                                          setEnabled={(enabled) => {
                                            const perUnit = enabled ? 'user' : 'month'
                                            setFieldValue(`${pricingKey}.perUnit`, perUnit)
                                            setFieldValue(`${pricingKey}.per`, PRICING_PER_OPTIONS[perUnit][0].value)
                                          }}
                                        />
                                        <span
                                          className={clsx(
                                            'min-w-[32px] text-left',
                                            pricing.perUnit === 'user' && 'text-primary font-semibold',
                                          )}
                                        >
                                          User
                                        </span>
                                      </div>
                                    </div>

                                    <Select
                                      items={PRICING_PER_OPTIONS[pricing.perUnit].map((option) => option.value)}
                                      selectedItem={pricing.per}
                                      renderSelectedItem={(value) => {
                                        const option = PRICING_PER_OPTIONS[pricing.perUnit].find(
                                          (item) => item.value === value,
                                        )
                                        return option ? option.label : 'Select'
                                      }}
                                      onSelectedItemChange={({ selectedItem }) =>
                                        setFieldValue(`${pricingKey}.per`, selectedItem)
                                      }
                                      className="flex-shrink-0 text-sm"
                                      buttonClassName="!px-3 !py-2"
                                    >
                                      {PRICING_PER_OPTIONS[pricing.perUnit].map((item) => (
                                        <Select.Option key={item.value} item={item.value}>
                                          {item.label}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </div>

                                  {pricingIndex === pricingsLength - 1 ? (
                                    <Button
                                      type="button"
                                      className="!space-x-0 !p-1 mt-8 mb-auto"
                                      icon={<BiPlus className="text-xl" />}
                                      onClick={addPricing}
                                    />
                                  ) : (
                                    <Button
                                      type="button"
                                      className="!space-x-0 !p-1 mt-8 mb-auto"
                                      icon={<BiTrash className="text-xl" />}
                                      onClick={handleRemovePricing}
                                      error
                                    />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )
                      }}
                    />

                    <label className="block mb-2 font-medium text-gray-800">Plan Features</label>
                    <FieldArray
                      name={`${planKey}.features`}
                      render={({ push: pushFeature, remove: removeFeature }) => {
                        function addFeature() {
                          pushFeature('')
                        }

                        return (
                          <Fragment>
                            {values.plans[planIndex].features.map((feature, featureIndex) => {
                              const featuresLength = values.plans[planIndex].features.length
                              const isLastFeatureField = featureIndex + 1 === featuresLength
                              const isFeatureEmpty = feature === ''

                              const featureKey = `${planKey}.features.${featureIndex}`
                              const featureTouched = touched?.plans?.[planIndex]?.features?.[featureIndex]
                              // @ts-expect-error
                              const featureError = errors?.plans?.[planIndex]?.features?.[featureIndex]

                              function handleOnKeyDown(event: KeyboardEvent<HTMLInputElement>) {
                                if (event.key === 'Enter' && !isFeatureEmpty && isLastFeatureField) {
                                  addFeature()
                                }
                                if (event.key === 'Delete' && isFeatureEmpty && featuresLength > 1) {
                                  removeFeature(featureIndex)
                                }
                              }

                              return (
                                <Field
                                  key={featureKey}
                                  id={featureKey}
                                  className="max-w-sm mb-3"
                                  name={featureKey}
                                  placeholder={`Feature ${featureIndex + 1}`}
                                  as={Input}
                                  errorMessage={featureTouched ? featureError : undefined}
                                  success={featureTouched && !featureError}
                                  onKeyDown={handleOnKeyDown}
                                />
                              )
                            })}
                            <div className="flex items-center mb-8 space-x-4">
                              <Button
                                type="button"
                                className="!space-x-0 !p-1"
                                icon={<BiPlus className="text-xl" />}
                                onClick={addFeature}
                              />
                              <p className="text-xs font-normal text-gray-400">
                                Pressing Enter
                                <HiOutlineLogout className="inline mx-1 text-base text-primary" />
                                will also add a new row
                              </p>
                            </div>
                          </Fragment>
                        )
                      }}
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
