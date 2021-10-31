import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Button } from '../../../../../components/button'
import { Input } from '../../../../../components/input'
import { forgotPasswordReset } from '../../../../../queries/forgot-password'

const validationSchema = yup.object().shape({
  new_password1: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please enter a password'),
  new_password2: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Please Re-enter the password')
    .oneOf([yup.ref('new_password1'), null], 'Passwords must match'),
})

export default function Login() {
  const { query, push } = useRouter()
  const { uidb64, token } = query as { uidb64: string; token: string }

  // useEffect(() => {
  //   if (next) {
  //     setNextPageUrl(next)
  //   }
  // }, [next, setNextPageUrl])

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] p-4">
      <div className="max-w-md p-0 rounded-md lg:p-6 lg:border">
        <h3 className="mb-4 text-lg font-medium leading-6 text-text-primary">Enter New Password</h3>
        <Formik
          initialValues={{ new_password1: '', new_password2: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const success = await forgotPasswordReset(uidb64, token, values)
            if (success) {
              toast.success('Your password has been reset.')
              push('/login')
            }
          }}
        >
          {({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                New Password
              </label>
              <Input
                placeholder="Enter new password"
                id="new_password1"
                className="mb-8"
                type="password"
                onChange={handleChange('new_password1')}
                onBlur={handleBlur('new_password1')}
                value={values.new_password1}
                errorMessage={touched.new_password1 ? errors.new_password1 : undefined}
                success={touched.new_password1 && !errors.new_password1}
              />
              <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                Confirm New Password
              </label>
              <Input
                placeholder="Re-enter password"
                id="new_password2"
                className="mb-8"
                type="password"
                onChange={handleChange('new_password2')}
                onBlur={handleBlur('new_password2')}
                value={values.new_password2}
                errorMessage={touched.new_password2 ? errors.new_password2 : undefined}
                success={touched.new_password2 && !errors.new_password2}
              />
              <div className="flex items-center space-x-4">
                <Button type="submit" buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                  Confirm
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
