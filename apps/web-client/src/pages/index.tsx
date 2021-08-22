import React from 'react'
import { AiFillLinkedin } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Input } from '@taggedweb/ui'

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please enter a password'),
})

export function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center space-x-20">
      <Image src={require('../images/signup.svg')} alt="Sign up to Taggedweb" className="max-w-3xl w-full" />
      <div className="max-w-md p-6 rounded-md my-10 border">
        <h1 className="text-3xl mb-3 font-semibold text-gray-700">Welcome to Taggedweb</h1>
        <h3 className="text-gray-500 mb-8">
          Signup to experience a world of web services and find out best for you...
        </h3>
        <Button
          icon={<AiFillLinkedin size={20} />}
          buttonType="primary"
          iconPlacement="right"
          className="w-full !bg-[#0077B5] !flex mb-8"
        >
          Sign in with LinkedIn
        </Button>
        <div className="text-xs text-gray-500 relative w-full flex items-center justify-center before:w-full before:absolute before:border-b before:border-gray-200 mb-8">
          <div className="bg-white px-4 inline-block mx-auto relative z-1">OR</div>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            console.log(data)
          }}
        >
          {({ handleSubmit, values, handleChange, handleBlur, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <label className="text-sm text-gray-700 mb-2 block" htmlFor="email">
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
              />
              <label className="text-sm text-gray-700 mb-2 block" htmlFor="email">
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
              />
              <div className="flex items-center space-x-4">
                <Button buttonType="primary">Sign Up with Email</Button>
                <div className="text-sm text-gray-600">
                  Already a member{' '}
                  <Link href="#">
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

export default Home
