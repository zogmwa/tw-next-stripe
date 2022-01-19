import React, { useEffect, useState } from 'react'
import { AiFillLinkedin, AiFillGoogleSquare } from 'react-icons/ai'
import Link from 'next/link'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Button } from '@taggedweb/components/button'
import { Input } from '@taggedweb/components/input'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { handleGoogleLogin, handleLinkedInLogin } from '@taggedweb/utils/login'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'

const validationSchema = yup.object().shape({
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup.string().email().required('Please enter a valid email'),
  password1: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please enter a password'),
  password2: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please Re-enter the password')
    .oneOf([yup.ref('password1'), null], 'Passwords must match'),
})

export default function Signup() {
  const { query } = useRouter()
  const { linkedInError, googleError, next } = query as { linkedInError: string; googleError: string; next: string }
  const { signUpWithEmailAndPassword, setNextPageUrl, nextPageRedirect, isLoading, isLoggedIn } = useUserContext()

  useEffect(() => {
    if (next) {
      setNextPageUrl(next)
    }
  }, [next, setNextPageUrl])

  useEffect(() => {
    // Checks if this code is run from the auth popup window
    if (typeof window !== 'undefined' && window.opener && window.opener !== window) {
      if (!isLoading && isLoggedIn()) {
        const targetWindow = window.opener as Window
        targetWindow.postMessage({ popupAuthResponse: true }, '*')
        window.close()
      }
    }
  }, [isLoading, isLoggedIn])

  const [errorMessage, setErrorMessage] = useState('')
  return (
    <>
      <DynamicHeader title="Taggedweb | Sign up" />
      <div className="flex flex-col items-center justify-center p-4 md:h-full">
        <div className="max-w-md p-0 mx-1 my-4 rounded-md md:p-6 md:border">
          <h1 className="mb-3 text-2xl font-semibold md:text-3xl text-text-primary">Welcome to TaggedWeb!</h1>
          <h3 className="mb-6 text-sm md:mb-8 md:text-base text-text-secondary">
            As a registered user on TaggedWeb.com, you can submit your software for listing, add and vote on features,
            book solutions from domain-experts to help you with integrations and so much more.
          </h3>
          <p className="text-xs text-center text-error">{linkedInError}</p>
          <Button
            icon={<AiFillLinkedin size={20} />}
            buttonType="primary"
            iconPlacement="right"
            className="w-full !bg-[#0077B5] !border-[#0077B5] !flex mb-4"
            onClick={() => handleLinkedInLogin()}
          >
            Sign up with LinkedIn
          </Button>
          <p className="text-xs text-center text-error">{googleError}</p>
          <Button
            icon={<AiFillGoogleSquare size={20} />}
            buttonType="primary"
            iconPlacement="right"
            className="w-full !bg-[#DB4437] !border-[#DB4437] !flex mb-8"
            onClick={() => handleGoogleLogin()}
          >
            Sign up with Google
          </Button>
          <div className="relative flex items-center justify-center w-full mb-6 text-xs text-text-secondary before:w-full before:absolute before:border-b before:border-border-default">
            <div className="relative inline-block px-4 mx-auto bg-background-surface z-1">OR</div>
          </div>
          {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}

          <Formik
            initialValues={{ first_name: '', last_name: '', email: '', password1: '', password2: '' }}
            validationSchema={validationSchema}
            onSubmit={async ({ first_name, last_name, email, password1, password2 }) => {
              const { success, errorMessage } = await signUpWithEmailAndPassword(first_name, last_name, email, password1, password2)
              setErrorMessage(errorMessage)
              if (success) {
                nextPageRedirect()
              }
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm text-text-primary" htmlFor="first_name">
                  First Name
                </label>
                <Input
                  placeholder="Enter your first name"
                  id="first_name"
                  className="mb-4"
                  onChange={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}
                  errorMessage={touched.first_name ? errors.first_name : undefined}
                  success={touched.first_name && !errors.first_name}
                />
                <label className="block mb-2 text-sm text-text-primary" htmlFor="last_name">
                  Last Name
                </label>
                <Input
                  placeholder="Enter your first name"
                  id="last_name"
                  className="mb-4"
                  onChange={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  value={values.last_name}
                  errorMessage={touched.last_name ? errors.last_name : undefined}
                  success={touched.last_name && !errors.last_name}
                />
                <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                  Email
                </label>
                <Input
                  placeholder="Enter your email"
                  id="email"
                  className="mb-4"
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorMessage={touched.email ? errors.email : undefined}
                  success={touched.email && !errors.email}
                />
                <label className="block mb-2 text-sm text-text-primary" htmlFor="password1">
                  Password
                </label>
                <Input
                  placeholder="Enter password"
                  id="password1"
                  className="mb-4"
                  type="password"
                  onChange={handleChange('password1')}
                  onBlur={handleBlur('password1')}
                  value={values.password1}
                  errorMessage={touched.password1 ? errors.password1 : undefined}
                  success={touched.password1 && !errors.password1}
                />
                <label className="block mb-2 text-sm text-text-primary" htmlFor="password2">
                  Confirm Password
                </label>
                <Input
                  placeholder="Re-enter password"
                  id="password2"
                  className="mb-4"
                  type="password"
                  onChange={handleChange('password2')}
                  onBlur={handleBlur('password2')}
                  value={values.password2}
                  errorMessage={touched.password2 ? errors.password2 : undefined}
                  success={touched.password2 && !errors.password2}
                />
                <div className="flex items-center space-x-4">
                  <Button type="submit" buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                    Sign Up
                  </Button>
                  <div className="text-xs md:text-sm text-text-secondary">
                    Already a member!{' '}
                    <Link href="/login">
                      <a className="font-bold">Sign in</a>
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
