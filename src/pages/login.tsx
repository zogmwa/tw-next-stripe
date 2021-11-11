import React, { useEffect } from 'react'
import { AiFillLinkedin, AiFillGoogleSquare } from 'react-icons/ai'
import Link from 'next/link'
import { Formik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Button } from '@taggedweb/components/button'
import { Input } from '@taggedweb/components/input'
import { handleGoogleLogin, handleLinkedInLogin } from '@taggedweb/utils/login'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { PasswordReset } from '@taggedweb/components/password-reset'
import { client } from '@taggedweb/utils/client'

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please enter a password'),
})

export default function Login() {
  const { query } = useRouter()
  const { linkedInError, googleError, next } = query as { linkedInError: string; googleError: string; next: string }
  const { signInWithEmailAndPassword, setNextPageUrl, nextPageRedirect, isLoading, isLoggedIn } = useUserContext()

  useEffect(() => {
    // Checks if this code is run from the auth popup window.
    if (typeof window !== 'undefined' && window.opener && window.opener !== window) {
      if (!isLoading && isLoggedIn()) {
        const targetWindow = window.opener as Window
        targetWindow.postMessage({ popupAuthResponse: true }, '*')
        window.close()
      }
    }
  }, [isLoading, isLoggedIn])

  useEffect(() => {
    if (next) {
      setNextPageUrl(next)
    }
  }, [next, setNextPageUrl])

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="max-w-md p-0 mx-4 rounded-md lg:p-6 lg:border">
        <h1 className="mb-3 text-2xl font-semibold lg:text-3xl text-text-primary">Welcome to TaggedWeb!</h1>
        <h3 className="mb-8 text-sm lg:text-base text-text-secondary">
          Login to continue surfing among the ocean of web services
        </h3>
        <p className="text-xs text-center text-error">{linkedInError}</p>
        <Button
          icon={<AiFillLinkedin size={20} />}
          buttonType="primary"
          iconPlacement="right"
          className="w-full !bg-[#0077B5] !border-[#0077B5] !flex mb-4"
          onClick={() => handleLinkedInLogin()}
        >
          Login with LinkedIn
        </Button>
        <p className="text-xs text-center text-error">{googleError}</p>
        <Button
          icon={<AiFillGoogleSquare size={20} />}
          buttonType="primary"
          iconPlacement="right"
          className="w-full !bg-[#DB4437] !border-[#DB4437] !flex mb-8"
          onClick={() => handleGoogleLogin()}
        >
          Login with Google
        </Button>
        <div className="relative flex items-center justify-center w-full mb-8 text-xs text-text-secondary before:w-full before:absolute before:border-b before:border-border-default">
          <div className="relative inline-block px-4 mx-auto bg-background-surface z-1">OR</div>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async ({ email, password }) => {
            const success = await signInWithEmailAndPassword(email, password)
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
                id="password"
                className="mb-4"
                type="password"
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={touched.password ? errors.password : undefined}
                success={touched.password && !errors.password}
              />
              <PasswordReset
                onEmailSubmit={async ({ email }) => {
                  try {
                    await client.post('/dj-rest-auth/password/reset/', { email })
                    toast.success('Sent Reset Link')
                    return true
                  } catch (error) {
                    toast.error('An error occurred')
                    return false
                  }
                }}
              />
              <div className="flex items-center space-x-4">
                <Button buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                  Login
                </Button>
                <div className="text-xs lg:text-sm text-text-secondary">
                  Don&apos;t have an account? <Link href="/signup">Create One</Link>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
