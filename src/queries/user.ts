import axios from 'axios'
import toast from 'react-hot-toast'
import * as Sentry from '@sentry/nextjs'

export async function PaymentMethodAttachToUser(paymentMethodId): Promise<any | null> {
  try {
    const { data } = await axios.post(`/api/user/payment_method/attach/`, {
      payment_method: paymentMethodId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    toast.error('We could not attach card info to your account. Please try again later.')
    return null
  }
}
