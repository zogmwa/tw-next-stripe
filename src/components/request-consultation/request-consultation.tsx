import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { AiOutlineClose } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { SolutionSidebarType } from '@taggedweb/types/solution'
import { client } from '@taggedweb/utils/client'
import { Button } from '../button'
import { Input } from '../input'

const emailSchema = yup.object().shape({
  customer_email: yup.string().email().required('Please enter a valid email'),
  customer_first_name: yup.string().required('Please enter first name.'),
  customer_last_name: yup.string(),
})

type RequestConsultationProps = {
  detailInfo: SolutionSidebarType
}

export function RequestConsultation({ detailInfo }: RequestConsultationProps) {
  const user = useUserContext()
  const [isOpen, setIsOpen] = useState(false)
  const [consultationBooked, setConsultationBooked] = useState(false)
  const [values, setValues] = useState({
    customer_email: '',
    customer_first_name: '',
    customer_last_name: '',
  })

  useEffect(() => {
    if (user.isLoggedIn()) {
      setValues({
        customer_email: user.email,
        customer_first_name: user.first_name,
        customer_last_name: user.last_name,
      })
    }
  }, [setValues, user])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const bookRequestOnBackend = useCallback(
    async (values) => {
      try {
        await client.post('/consultation_request/', { solution: detailInfo.id, ...values })
        setConsultationBooked(true)
      } catch (e) {
        toast.error('Could not book a consultation')
        // eslint-disable-next-line no-console
        console.dir(e)
      }
    },
    [setConsultationBooked, detailInfo.id],
  )

  const bookRequestButtonClicked = useCallback(() => {
    if (user.isLoggedIn()) {
      // if (!consultationBooked && values.customer_email && values.customer_first_name) {
      if (!consultationBooked) {
        bookRequestOnBackend(values)
      }
    } else {
      openModal()
    }
  }, [values, user, consultationBooked, openModal, bookRequestOnBackend])

  return (
    <>
      <div className="mb-6 text-xs lg:text-sm text-text-secondary">
        <a href="#" onClick={bookRequestButtonClicked}>
          <Button className="w-32 mt-4 bg-primary" textClassName="text-white">
            Request Free Consultation
          </Button>
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
                  Forgot Password
                </Dialog.Title>
                <button
                  className="absolute p-1 mb-6 ml-auto rounded-md focus:ring-white right-5 top-5 hover:bg-secondary"
                  onClick={closeModal}
                >
                  <AiOutlineClose type="button" size={20} />
                </button>
                <Dialog.Description as="div">
                  <Formik
                    initialValues={{ customer_email: '', customer_first_name: '', customer_last_name: '' }}
                    validationSchema={emailSchema}
                    // eslint-disable-next-line
                    onSubmit={async (values) => {
                      return bookRequestOnBackend(values)
                    }}
                  >
                    {({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) =>
                      consultationBooked === false ? (
                        <>
                          <form onSubmit={handleSubmit}>
                            <label className="block mb-2 text-sm text-text-primary" htmlFor="customer_email">
                              Email
                            </label>
                            <Input
                              placeholder="Enter your email"
                              id="customer_email"
                              className="mb-4"
                              onChange={handleChange('customer_email')}
                              onBlur={handleBlur('customer_email')}
                              value={values.customer_email}
                              errorMessage={touched.customer_email ? errors.customer_email : undefined}
                              success={touched.customer_email && !errors.customer_email}
                            />
                            <label className="block mb-2 text-sm text-text-primary" htmlFor="customer_first_name">
                              First Name
                            </label>
                            <Input
                              placeholder="Enter your first name"
                              id="customer_first_name"
                              className="mb-4"
                              onChange={handleChange('customer_first_name')}
                              onBlur={handleBlur('customer_first_name')}
                              value={values.customer_first_name}
                              errorMessage={touched.customer_first_name ? errors.customer_first_name : undefined}
                              success={touched.customer_first_name && !errors.customer_first_name}
                            />
                            <label className="block mb-2 text-sm text-text-primary" htmlFor="customer_last_name">
                              Last Name
                            </label>
                            <Input
                              placeholder="Enter your last name"
                              id="customer_last_name"
                              className="mb-4"
                              onChange={handleChange('customer_last_name')}
                              onBlur={handleBlur('customer_last_name')}
                              value={values.customer_last_name}
                              errorMessage={touched.customer_last_name ? errors.customer_last_name : undefined}
                              success={touched.customer_last_name && !errors.customer_last_name}
                            />
                            <div className="flex items-center space-x-4">
                              <Button type="submit" buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                                Get Link
                              </Button>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <p className="mb-4 text-text-primary">
                            Please follow this link to book a consultation.{' '}
                            <a href={detailInfo.consultation_scheduling_link}>
                              <span className="text-primary">
                                {detailInfo.consultation_scheduling_link ?? 'Invalid Link'}
                              </span>
                            </a>
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
