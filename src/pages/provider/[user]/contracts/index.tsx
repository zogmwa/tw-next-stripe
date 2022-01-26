import React from 'react'
import { useRouter } from 'next/router'
import * as Sentry from '@sentry/nextjs'
import { fetchProviderContract } from '@taggedweb/solution-queries/fetch-provider-contract'
import { withSessionSSR } from '@taggedweb/utils/session'
import { ProviderContractCard } from '@taggedweb/components/provider-contract-card'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    query: { user },
  } = context

  try {
    const contractData = (await fetchProviderContract(context.req, user, '')) ?? []

    return {
      props: { contractData },
    }
  } catch (err) {
    Sentry.captureException(err)
    return {
      props: {
        contractData: [],
      },
    }
  }
})

export default function ProviderContract({ contractData }) {
  const { query } = useRouter()
  const { user } = query as { user: string }
  const contractsList = contractData
  const breadcrumbData = [
    {
      name: 'Home',
      url: `${process.env.SITE_BASE_URL}/`,
      is_selected: false,
    },
    {
      name: 'Provider',
      url: '/profile',
      is_selected: false,
    },
    {
      name: 'Contracts',
      url: '#',
      is_selected: true,
    },
  ]

  contractsList &&
    contractsList.sort((contractA, contractB) => {
      const dateA = new Date(contractA.started_at)
      const dateB = new Date(contractB.started_at)
      return (dateA.getTime() - dateB.getTime()) * -1
    })
  return (
    <div id="contracts" className="flex flex-col w-3/4 mx-auto xl:w-1/2 my-4 lg:my-8 min-h-[50%]">
      <Breadcrumb breadcrumbs={breadcrumbData} className="mb-4" mobileAct={false} />
      <p className="my-2 text-lg font-bold">Providing Contracts</p>
      <div className="w-full mb-4">
        {contractsList && contractsList.length === 0 && <p className="text-center">No Contracts yet...</p>}
        {contractsList &&
          contractsList.map((contract, index) => {
            if (typeof contract === 'undefined') return null
            else {
              return (
                <ProviderContractCard
                  key={`contract-${index}`}
                  contractData={contract}
                  redirectUrl={`/provider/${user}/contracts/${contract.id}`}
                />
              )
            }
          })}
      </div>
    </div>
  )
}
