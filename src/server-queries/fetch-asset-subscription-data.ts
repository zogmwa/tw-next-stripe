import { SessionRequest } from '@taggedweb/types/session'
import { serverSideClient } from '../utils/client'
import { getAccessToken } from '../utils/token'

/**
 * Fetching partner's asset subscription data.
 * @param customer_uid: partner's customer uid
 * @param price_id: Asset price plan id
 * @returns partner's organization and price plan data
 */
export async function fetchAssetSubscriptionData(req: SessionRequest, customer_uid, price_id, session_id) {
  const access = await getAccessToken(req)
  const requsetBody = {
    customer_uid: customer_uid,
    price_plan_id: price_id,
    session_id: session_id,
  }
  if (access) {
    const { data } = await serverSideClient(req).post(
      '/third_party_customer_sessions/get_subscription_data/',
      requsetBody,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
    )
    return data
  } else {
    const { data } = await serverSideClient(req).post(
      '/third_party_customer_sessions/get_subscription_data/',
      requsetBody,
    )
    return data
  }
}
