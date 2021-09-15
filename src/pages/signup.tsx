import React from 'react'
import { AiFillLinkedin, AiFillGoogleSquare } from 'react-icons/ai'
import Link from 'next/link'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button } from '../components/button'
import { Input } from '../components/input'

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please enter a password'),
})

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-full p-4">
      <div className="max-w-md p-0 rounded-md lg:p-6 lg:border">
        <h1 className="mb-3 text-2xl font-semibold lg:text-3xl text-text-primary">Welcome to Taggedweb</h1>
        <h3 className="mb-8 text-sm lg:text-base text-text-secondary">
          Signup to experience a world of web services and find out best for you...
        </h3>
        <Button
          icon={<AiFillLinkedin size={20} />}
          buttonType="primary"
          iconPlacement="right"
          className="w-full !bg-[#0077B5] !border-[#0077B5] !flex mb-4"
        >
          Sign in with LinkedIn
        </Button>
        <Button
          icon={<AiFillGoogleSquare size={20} />}
          buttonType="primary"
          iconPlacement="right"
          className="w-full !bg-[#DB4437] !border-[#DB4437] !flex mb-8"
        >
          Sign in with Google
        </Button>
        <div className="relative flex items-center justify-center w-full mb-8 text-xs text-text-secondary before:w-full before:absolute before:border-b before:border-border-default">
          <div className="relative inline-block px-4 mx-auto bg-background-surface z-1">OR</div>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            // eslint-disable-next-line no-console
            console.log(data)
          }}
        >
          {({ handleSubmit, values, handleChange, handleBlur, touched, errors }) => (
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
                <Button buttonType="primary">Sign Up</Button>
                <div className="text-sm text-text-secondary">
                  Already a member!{' '}
                  <Link href="/login">
                    <a href="">Sign in</a>
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
