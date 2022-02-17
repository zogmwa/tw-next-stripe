import { TOAST_PASSWORD_RESET_ERROR } from '@taggedweb/utils/token-id'
import toast from 'react-hot-toast'
import { client } from '../utils/client'

export type forgotPasswordResetInput = {
  new_password1: string
  new_password2: string
}

export async function forgotPasswordReset(uidb64: string, token: string, values: forgotPasswordResetInput) {
  try {
    const uid = window.atob(uidb64)
    await client.post(`/password/reset/confirm/${uidb64}/${token}/`, { uid, token, ...values })
    return true
  } catch (error) {
    if (error?.response.data) {
      const obj = error.response.data
      toast.error(obj[Object.keys(obj)[0]], {
        id: TOAST_PASSWORD_RESET_ERROR,
      })
    } else {
      toast.error('Could not reset password. Try again.', {
        id: TOAST_PASSWORD_RESET_ERROR,
      })
    }
    return false
  }
}
