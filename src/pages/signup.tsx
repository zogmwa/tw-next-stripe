import React, { useEffect } from 'react'
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

  return (
    <>
      <DynamicHeader title="Taggedweb | Sign up" />
      <div className="flex flex-col items-center justify-center w-screen h-full p-4">
        <div className="max-w-md p-0 rounded-md lg:p-6 lg:border">
          <h1 className="mb-3 text-2xl font-semibold lg:text-3xl text-text-primary">Welcome to TaggedWeb!</h1>
          <h3 className="mb-8 text-sm lg:text-base text-text-secondary">
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
          <div className="relative flex items-center justify-center w-full mb-8 text-xs text-text-secondary before:w-full before:absolute before:border-b before:border-border-default">
            <div className="relative inline-block px-4 mx-auto bg-background-surface z-1">OR</div>
          </div>
          <Formik
            initialValues={{ email: '', password1: '', password2: '' }}
            validationSchema={validationSchema}
            onSubmit={async ({ email, password1, password2 }) => {
              const success = await signUpWithEmailAndPassword(email, password1, password2)
              if (success) {
                nextPageRedirect()
              }
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                  Email
                </label>
                <Input
                  placeholder="Enter email"
                  id="email"
                  className="mb-8"
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorMessage={touched.email ? errors.email : undefined}
                  success={touched.email && !errors.email}
                />
                <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                  Password
                </label>
                <Input
                  placeholder="Enter password"
                  id="password1"
                  className="mb-8"
                  type="password"
                  onChange={handleChange('password1')}
                  onBlur={handleBlur('password1')}
                  value={values.password1}
                  errorMessage={touched.password1 ? errors.password1 : undefined}
                  success={touched.password1 && !errors.password1}
                />
                <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                  Confirm Password
                </label>
                <Input
                  placeholder="Re-enter password"
                  id="password2"
                  className="mb-8"
                  type="password"
                  onChange={handleChange('password2')}
                  onBlur={handleBlur('password2')}
                  value={values.password2}
                  errorMessage={touched.password2 ? errors.password2 : undefined}
                  success={touched.password2 && !errors.password2}
                />
                <div className="flex items-center space-x-4">
                  <Button buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                    Sign Up
                  </Button>
                  <div className="text-xs lg:text-sm text-text-secondary">
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
