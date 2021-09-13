import React, { Fragment } from 'react'
import { Field, FieldArray, Form, FormikProps } from 'formik'
import * as yup from 'yup'
import clsx, { ClassValue } from 'clsx'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { Button } from '../button'

export type FAQFormValues = {
  questions: Array<{
    question: string
    answer: string
  }>
}

// @TODO: Update min max limits according to api
export const faqSchema = yup.object().shape({
  questions: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          question: yup.string().min(10).max(50).required().label('Question'),
          answer: yup.string().min(12).max(75).required().label('Answer'),
        })
        .required(),
    )
    .label('Questions'),
})

type FAQFormProps = {
  className?: ClassValue
} & FormikProps<FAQFormValues>

export function FAQForm({ className, touched, errors, values }: FAQFormProps) {
  return (
    <Form className={clsx(className)}>
      <FieldArray
        name="questions"
        render={({ push, remove }) => {
          return (
            <>
              {values.questions.map((question, index) => {
                const isLastQuestion = values.questions.length === index + 1
                const isSingleQuestion = values.questions.length === 1

                const fieldTouched = {
                  question: touched?.questions?.[index]?.question,
                  answer: touched?.questions?.[index]?.answer,
                }
                const fieldErrors = {
                  // Known bug in formik errors type
                  // Type of error for array of objects is assumed to be string
                  // @ts-expect-error
                  question: errors?.questions?.[index]?.question,
                  // @ts-expect-error
                  answer: errors?.questions?.[index]?.answer,
                }

                function handleAddQuestion() {
                  push({ question: '', answer: '' })
                }

                function handleDeleteQuestion() {
                  if (!isSingleQuestion) {
                    remove(index)
                  }
                }

                return (
                  <Fragment key={`question-${index}`}>
                    <label className="block mb-2 font-medium text-text-primary" htmlFor={`question-${index}`}>
                      Question
                    </label>
                    <Field
                      id={`question-${index}`}
                      className="mb-8"
                      name={`questions.${index}.question`}
                      placeholder="Write something..."
                      as={Input}
                      success={fieldTouched.question && !fieldErrors.question}
                      errorMessage={fieldTouched.question ? fieldErrors.question : undefined}
                    />

                    <label className="block mb-2 font-medium text-text-primary" htmlFor={`answer-${index}`}>
                      Answer
                    </label>
                    <Field
                      id={`answer-${index}`}
                      className="mb-4"
                      name={`questions.${index}.answer`}
                      placeholder="Write something..."
                      as={Textarea}
                      success={fieldTouched.answer && !fieldErrors.answer}
                      errorMessage={fieldTouched.answer ? fieldErrors.answer : undefined}
                    />

                    <div className={clsx('flex items-start space-x-2', !isLastQuestion && 'mb-10')}>
                      {isLastQuestion && (
                        <Button
                          icon={<BiPlus className="text-lg" />}
                          type="button"
                          buttonType="primary"
                          onClick={handleAddQuestion}
                        >
                          Add Question
                        </Button>
                      )}
                      {!isSingleQuestion && (
                        <Button
                          className="!space-x-0"
                          type="button"
                          icon={<BiTrash className="text-lg" />}
                          onClick={handleDeleteQuestion}
                        />
                      )}
                    </div>
                  </Fragment>
                )
              })}
            </>
          )
        }}
      />
    </Form>
  )
}
