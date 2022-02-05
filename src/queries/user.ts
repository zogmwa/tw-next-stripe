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
    const { data } = await axios.post('/api/user/payment_method/subscribe_solution/', {
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

export async function toggleDetachPaymentMethod(paymentMethodId): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/payment_method/detach/', {
      payment_method: paymentMethodId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    return null
  }
}

export async function TrackingTimeReport(trackingData, bookingId): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/tracking_time_report/', {
      tracking_time: trackingData,
      booking_id: bookingId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    return null
  }
}

export async function fetchingGoogleSheet(url, bookingId): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/fetch_google_sheet/', {
      google_sheet: url,
      booking_id: bookingId,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    return null
  }
}

export async function toggleStartContract(bookingId, username): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/start_contract/', {
      booking_id: bookingId,
      username: username,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    return null
  }
}
