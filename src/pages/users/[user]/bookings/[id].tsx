import React from 'react'
import { useRouter } from 'next/router'
import { fetchContract } from '@taggedweb/solution-queries/fetch-contract'
import { withSessionSSR } from '@taggedweb/utils/session'
import { ContractCard } from '@taggedweb/components/contract-card/contract-card'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    query: { user, id },
  } = context

  try {
    const contractData = await fetchContract(context.req.session, user, id)

    return {
      props: { contractData },
    }
  } catch (err) {
    return {
      props: {},
    }
  }
})

export default function Contracts({ contractData }) {
  const { query } = useRouter()
  const { user } = query as { user: string }
  const contractsList = contractData

  contractsList &&
    contractsList.sort((contractA, contractB) => {
      const dateA = new Date(contractA.started_at)
      const dateB = new Date(contractB.started_at)
      return (dateA.getTime() - dateB.getTime()) * -1
    })

  return (
    <div id="contracts" className="flex flex-col max-w-screen-lg px-2 mx-auto my-10">
      <p className="mb-2 text-lg font-bold">Contract</p>
      <div className="w-full mb-4">
        {contractsList && contractsList.length === 0 && <p className="text-center">No Contracts yet...</p>}
        {contractsList &&
          contractsList.map((contract, index) => {
            if (typeof contract === 'undefined') return null
            else
              return (
                <ContractCard
                  key={`contract-${index}`}
                  contractData={contract}
                  redirectUrl={`/users/${user}/bookings/${contract.id}`}
                />
              )
          })}
      </div>
    </div>
  )
}
