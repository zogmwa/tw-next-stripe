import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { StyledStarRating } from '../styled-star-rating'
import { Button } from '../button'
import { Input } from '../input'
import { Textarea } from '../textarea'

type ReviewInputProps = {
  serviceName: string
  onSubmit: (arg0: object) => void
}

const validationSchema = yup.object().shape({
  overall: yup.number().required('Please enter an overall rating'),
  review: yup.string(),
  videoUrl: yup.string(),
})

const items = [
  {
    slug: 'overall',
    name: 'Overall',
  },
  {
    slug: 'features',
    name: 'Features',
  },
  {
    slug: 'easeOfUse',
    name: 'Ease of Use',
  },
  {
    slug: 'valueForMoney',
    name: 'Value for Money',
  },
  {
    slug: 'customerSupport',
    name: 'Customer Support',
  },
]

function ReviewInputComponent({ serviceName, onSubmit }: ReviewInputProps) {
  return (
    <Formik
      initialValues={{
        review: '',
        videoUrl: '',
        overall: '',
        features: '',
        easeOfUse: '',
        valueForMoney: '',
        customerSupport: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        onSubmit(data)
      }}
    >
      {({ handleSubmit, values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="my-2 font-medium text-text-primary">
            Did you use {serviceName}? What do you think of this product?
          </div>
          <div className="flex flex-col mb-4 space-y-4">
            {items.map((item, index) => (
              <div className="flex justify-between w-full md:w-2/5" key={index}>
                <div className="text-sm text-text-secondary">{item.name}</div>
                <StyledStarRating
                  name={item.name}
                  defaultValue={0}
                  className="space-x-1"
                  precision={0.5}
                  emptyColor="#E5E7EB"
                  size="1.5rem"
                  onChange={(event) => console.log(item.name, event.target.value * 2)}
                />
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
            placeholder="Video Review URL"
            onChange={handleChange('videoUrl')}
            onBlur={handleBlur('videoUrl')}
            value={values.videoUrl}
            errorMessage={touched.videoUrl ? errors.videoUrl : undefined}
          />
          {touched.overall && errors.overall && <div className="mb-4 text-red-500">{errors.overall}</div>}
          <Button buttonType="primary" type="submit">
            Post Your Review
          </Button>
        </form>
      )}
    </Formik>
  )
}

export const ReviewInput = ReviewInputComponent
