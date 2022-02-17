import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Fetching partner's payment method list.
 * @param customer_uid: partner's customer uid
 * @returns partner's organization and price plan data
 */
export async function fetchPartnerPaymentMethods(req: SessionRequest, customer_uid, session_id) {
  const access = await getAccessToken(req)
  const requsetBody = {
    customer_uid: customer_uid,
    session_id: session_id,
  }
  if (access) {
    const { data } = await serverSideClient(req).post('/third_party_customer_sessions/payment_methods/', requsetBody, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await serverSideClient(req).post('/third_party_customer_sessions/payment_methods/', requsetBody)
    return data
  }
}
