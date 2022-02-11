/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useRouter } from 'next/router'
import { fetchContract } from '@taggedweb/solution-queries/fetch-contract'
import { withSessionSSR } from '@taggedweb/utils/session'
import { ContractDetail } from '@taggedweb/components/contract-detail'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    query: { id },
  } = context
  const contractData = (await fetchContract(context.req, id)) ?? []

  return {
    props: { contractData },
  }
})

export default function Contracts({ contractData }) {
  const contract = contractData.results[0]

  return (
    <div id="contracts" className="flex flex-col max-w-screen-lg mx-auto my-4 md:my-10">
      <div className="w-full">
        <ContractDetail contractData={contract} />
      </div>
    </div>
  )
}
