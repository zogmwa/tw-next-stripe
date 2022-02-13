import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Fetching partner's price plan data.
 * @param customer_uid: partner's customer uid
 * @param price_id: Asset price plan id
 * @returns partner's organization and price plan data
 */
export async function fetchPartnerPricePlanData(req: SessionRequest, customer_uid, price_id) {
  const access = await getAccessToken(req)
  const requsetBody = {
    customer_uid: customer_uid,
    price_id: price_id,
  }
  if (access) {
    const { data } = await serverSideClient(req).post('/users/partner_price_plan/', requsetBody, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    return data
  } else {
    const { data } = await serverSideClient(req).post('/users/partner_price_plan/', requsetBody)
    return data
  }
}
