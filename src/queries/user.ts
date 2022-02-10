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

export async function fetchPaymentMethodList(customerId = ''): Promise<null | any> {
  try {
    const { data } = await axios.get(`/api/user/payment_method/payment_method_list?customer_id=${customerId}`)
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

export async function toggleDetachPaymentMethod(paymentMethodId, partner_customer_id = ''): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/payment_method/detach/', {
      payment_method: paymentMethodId,
      partner_customer_id: partner_customer_id,
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

export async function toggleContractPauseOrResume(bookingId, username, pauseStatus, pageType): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/pause_or_resume_contract/', {
      booking_id: bookingId,
      username: username,
      pause_status: pauseStatus,
      page_type: pageType,
    })
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-line
    return null
  }
}

export async function attachPaymentMethodForPartner(paymentMethod, customer_id): Promise<any | null> {
  try {
    const { data } = await axios.post('/api/user/payment_method/attach_for_partner/', {
      payment_method: paymentMethod,
      customer_id: customer_id,
    })
    console.log(data)
    return data
  } catch (error) {
    Sentry.captureException(error)
    // TODO: error handling
    // eslint-disable-next-lione
    return null
  }
}
