import React from 'react'
import * as Sentry from '@sentry/nextjs'
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
  return (
    <div id="contracts" className="flex flex-col max-w-screen-lg mx-auto min-h-[50%]">
      <ProviderContractDetail trackingData={trackingData} />
    </div>
  )
}
