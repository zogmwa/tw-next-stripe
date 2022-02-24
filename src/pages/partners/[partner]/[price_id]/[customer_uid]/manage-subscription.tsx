import React from 'react'
import { useRouter } from 'next/router'
import { withSessionSSR } from '@taggedweb/utils/session'
import Card from '@taggedweb/components/card/card'
import { fetchAssetSubscriptionData } from '@taggedweb/server-queries/fetch-asset-subscription-data'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { partner, price_id, customer_uid },
    query: { session_id },
  } = context
  let pageData
  try {
    pageData = await fetchAssetSubscriptionData(context.req, customer_uid, price_id, session_id)
    if (!pageData.is_subscribe)
      return {
        redirect: {
          destination: `/partners/${partner}/${price_id}/${customer_uid}/start-plan-subscription?session_id=${session_id}`,
          permanent: false,
        },
        props: {},
      }
  } catch (error) {
    return {
      notFound: true,
    }
    // eslint-disable-next-line
    // TODO: Redirect to subscribe asset price plan page.
  }
  return {
    props: { pageData }
  }
})

export default function ManageSubscription({ pageData }) {
  return (
    <div className="flex flex-col max-w-screen-lg px-4 mx-auto my-6 md:my-24">
      <div className='flex'>
      </div>
    </div>
  )
}
