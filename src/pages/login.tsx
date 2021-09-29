import React, { useState } from 'react'
import { AiFillLinkedin, AiFillGoogleSquare } from 'react-icons/ai'
import Link from 'next/link'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { useUserContext } from '../hooks/use-user'

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please enter a password'),
})

export default function Login() {
  function handleLinkedInLogin() {
    const redirectUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/login-with-linkedin'
        : 'https://taggedweb.com/login-with-linkedin'
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${redirectUrl}&state=${process.env.LINKEDIN_OAUTH_STATE}&scope=r_liteprofile,r_emailaddress`
  }

  const { query } = useRouter()
  const { linkedInError } = query as { linkedInError: string }
  const { signInWithEmailAndPassword } = useUserContext()

  const router = useRouter()

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="max-w-md p-0 mx-4 rounded-md lg:p-6 lg:border">
        <h1 className="mb-3 text-2xl font-semibold lg:text-3xl text-text-primary">Welcome Back....</h1>
        <h3 className="mb-8 text-sm lg:text-base text-text-secondary">
          Login to continue surfing among the ocean of web services
        </h3>
        <p className="text-xs text-center text-error">{linkedInError}</p>
        <Button
          icon={<AiFillLinkedin size={20} />}
          buttonType="primary"
          iconPlacement="right"
          className="w-full !bg-[#0077B5] !border-[#0077B5] !flex mb-4"
          onClick={handleLinkedInLogin}
        >
          Login with LinkedIn
        </Button>
        <Button
          icon={<AiFillGoogleSquare size={20} />}
          buttonType="primary"
          iconPlacement="right"
          className="w-full !bg-[#DB4437] !border-[#DB4437] !flex mb-8"
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
              router.push('/')
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
                className="mb-8"
                type="password"
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={touched.password ? errors.password : undefined}
                success={touched.password && !errors.password}
              />
              <div className="flex items-center space-x-4">
                <Button buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                  Login
                </Button>
                <div className="text-xs lg:text-sm text-text-secondary">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup">
                    <a href="">Create One</a>
                  </Link>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
