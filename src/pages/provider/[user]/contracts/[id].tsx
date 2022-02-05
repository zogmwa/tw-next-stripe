import React from 'react'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { ProviderContractDetail } from '@taggedweb/components/provider-contract-detail'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchProviderContract } from '@taggedweb/solution-queries/fetch-provider-contract'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    query: { user, id },
  } = context

  try {
    const trackingData = await fetchProviderContract(context.req, user, id)
    if (trackingData.length < 1) {
      return {
        props: {},
      }
    }
    return {
      props: { trackingData },
    }
  } catch (err) {
    Sentry.captureException(err)
    return {
      props: {},
    }
  }
})

export default function TrackingTime({ trackingData }) {
  console.log('trackingData:', trackingData)
  const { query } = useRouter()
  const { id, user } = query as { id: string; user: string }
  return (
    <div id="contracts" className="flex flex-col max-w-screen-lg mx-auto min-h-[50%] p-4 md:p-0">
      <ProviderContractDetail trackingData={trackingData} bookingId={id} username={user} />
    </div>
  )
}
