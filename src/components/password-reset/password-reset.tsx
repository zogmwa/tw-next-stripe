import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { AiOutlineClose } from 'react-icons/ai'
import { Button } from '../button'
import { Input } from '../input'

const emailSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
})

type PasswordResetProps = {
  onEmailSubmit: (values: { email: string }) => Promise<Boolean>
}

export function PasswordReset({ onEmailSubmit }: PasswordResetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [linkSent, setLinkSent] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setLinkSent(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="mb-6 text-xs lg:text-sm text-text-secondary">
        <a href="#" onClick={openModal}>
          Reset Password
        </a>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto shadow-xl" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-300 bg-opacity-20" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="mb-3 text-lg font-medium leading-6 text-text-primary">
                  Reset Password
                </Dialog.Title>
                <button
                  className="absolute p-1 mb-6 ml-auto rounded-md focus:ring-white right-5 top-5 hover:bg-secondary"
                  onClick={closeModal}
                >
                  <AiOutlineClose type="button" size={20} />
                </button>
                <Dialog.Description as="div">
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={emailSchema}
                    // eslint-disable-next-line
                    onSubmit={async (values) => {
                      const success = await onEmailSubmit(values)
                      if (success) {
                        setLinkSent(true)
                      }
                    }}
                  >
                    {({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) =>
                      linkSent === false ? (
                        <>
                          <form onSubmit={handleSubmit}>
                            <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                              Email
                            </label>
                            <Input
                              placeholder="Enter email"
                              id="email"
                              className="mb-4"
                              onChange={handleChange('email')}
                              onBlur={handleBlur('email')}
                              value={values.email}
                              errorMessage={touched.email ? errors.email : undefined}
                              success={touched.email && !errors.email}
                            />
                            <div className="flex items-center space-x-4">
                              <Button type="submit" buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                                Send Link
                              </Button>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <p className="mb-4 text-text-primary">
                            Password reset link sent to <span className="text-primary">{values.email}</span>. Check your
                            email.
                          </p>
                          <Button type="button" buttonType="primary" onClick={closeModal}>
                            Close
                          </Button>
                        </>
                      )
                    }
                  </Formik>
                </Dialog.Description>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
