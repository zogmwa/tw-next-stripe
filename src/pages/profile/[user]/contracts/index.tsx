import React from 'react'
import { useRouter } from 'next/router'
import { fetchContract } from '@taggedweb/solution-queries/fetch-contract'
import { withSessionSSR } from '@taggedweb/utils/session'
import { ContractCard } from '@taggedweb/components/contract-card/contract-card'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    query: { user },
  } = context

  const contractData = (await fetchContract(context.req, user, '')) ?? []

  return {
    props: { contractData },
  }
})

export default function ContractsList({ contractData }) {
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
      name: 'Profile',
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
      <p className="my-2 text-lg font-bold">Contracts</p>
      <div className="w-full mb-4">
        {contractsList && contractsList.length === 0 && <p className="text-center">No Contracts yet...</p>}
        {contractsList &&
          contractsList.map((contract, index) => {
            if (typeof contract === 'undefined') return null
            else {
              return (
                <ContractCard
                  key={`contract-${index}`}
                  contractData={contract}
                  redirectUrl={`/profile/${user}/contracts/${contract.id}`}
                />
              )
            }
          })}
      </div>
    </div>
  )
}
