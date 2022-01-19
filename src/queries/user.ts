import axios from 'axios'
import toast from 'react-hot-toast'
import * as Sentry from '@sentry/nextjs'

export async function PaymentMethodAttachToUser(paymentMethodId): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/payment_method/attach/', {
      payment_method: paymentMethodId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    toast.error('We are facing trouble attaching your card info to your account. Please try in sometime.')
    return null
  }
}

export async function fetchPaymentMethodList(): Promise<null | any> {
  try {
    const { data } = await axios.get('/api/user/payment_method/payment_method_list/')
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    return null
  }
}

export async function togglePaymentSubscribe(paymentMethodId, solutionSlug, referringUserId): Promise<null | any> {
  try {
    const { data } = await axios.post('/api/user/payment_method/subscribe_payment/', {
      payment_method: paymentMethodId,
      slug: solutionSlug,
      referring_user: referringUserId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    return null
  }
}