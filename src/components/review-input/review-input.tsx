import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { StyledStarRating } from '../styled-star-rating'
import { Button } from '../button'
import { Input } from '../input'
import { Textarea } from '../textarea'

type ReviewInputProps = {
  serviceName: string
  handleSubmit: Function
}

const validationSchema = yup.object().shape({
  avarageRate: yup
    .number()
    .positive()
    .min(0.1, 'Please enter an overall rating')
    .required('Please enter an overall rating'),
  review: yup.string(),
  videoUrl: yup.string(),
})

const items = [
  {
    slug: 'overall',
    name: 'Overall',
  },
  // {
  //   slug: 'features',
  //   name: 'Features',
  // },
  // {
  //   slug: 'easeOfUse',
  //   name: 'Ease of Use',
  // },
  // {
  //   slug: 'valueForMoney',
  //   name: 'Value for Money',
  // },
  // {
  //   slug: 'customerSupport',
  //   name: 'Customer Support',
  // },
]

function ReviewInputComponent({ serviceName, handleSubmit }: ReviewInputProps) {
  const { requireLoginBeforeAction } = useRequireLogin()

  return (
    <Formik
      initialValues={{
        review: '',
        videoUrl: '',
        avarageRate: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={requireLoginBeforeAction((data) => {
        handleSubmit(data)
      })}
    >
      {({ handleSubmit, values, handleChange, handleBlur, touched, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="my-2 font-medium text-text-primary">
            Did you use {serviceName}? What do you think of this product?
          </div>
          <div className="flex flex-col mb-4 space-y-4">
            {items.map((item, index) => (
              <div className="flex justify-between w-full md:w-2/5" key={index}>
                <div className="text-sm text-text-secondary">{item.name}</div>
                <div>
                  <StyledStarRating
                    name={item.name}
                    value={Number(values.avarageRate)}
                    className="space-x-1"
                    precision={0.5}
                    emptyColor="#E5E7EB"
                    size="1.5rem"
                    // eslint-disable-next-line no-console
                    onChange={handleChange('avarageRate')}
                  />
                  {touched.avarageRate && errors.avarageRate && (
                    <div className="mb-2 text-xs text-red-500">{errors.avarageRate}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Textarea
            className="w-full mb-4"
            placeholder="Based on your experiene, write a review..."
            onChange={handleChange('review')}
            onBlur={handleBlur('review')}
            value={values.review}
            errorMessage={touched.review ? errors.review : undefined}
          />
          <Input
            type="text"
            className="w-full mb-4"
            placeholder="Paste a video review link here (optional)"
            onChange={handleChange('videoUrl')}
            onBlur={handleBlur('videoUrl')}
            value={values.videoUrl}
            errorMessage={touched.videoUrl ? errors.videoUrl : undefined}
          />
          <Button buttonType="primary" type="submit">
            Post Your Review
          </Button>
        </form>
      )}
    </Formik>
  )
}

export const ReviewInput = ReviewInputComponent
