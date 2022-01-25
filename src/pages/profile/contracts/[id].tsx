/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useRouter } from 'next/router'
import { fetchContract } from '@taggedweb/solution-queries/fetch-contract'
import { withSessionSSR } from '@taggedweb/utils/session'
import { ContractDetail } from '@taggedweb/components/contract-detail'
// import { Breadcrumb } from '@taggedweb/components/breadcrumb'

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
  const { query } = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = query
  const contract = contractData[0]
  // const breadcrumbData = [
  //   {
  //     name: 'Profile',
  //     url: '/profile',
  //     is_selected: false,
  //   },
  //   {
  //     name: 'Contracts',
  //     url: `/profile/${user}/contracts`,
  //     is_selected: false,
  //   },
  //   {
  //     name: contract.id,
  //     url: '#',
  //     is_selected: true,
  //   },
  // ]

  return (
    <div id="contracts" className="flex flex-col max-w-screen-lg px-2 mx-auto my-10">
      {/* <Breadcrumb breadcrumbs={breadcrumbData} className="mb-4" mobileAct={false} /> */}
      <p className="mb-2 text-xl font-bold">Your Booking Details</p>
      <div className="w-full mb-4">
        <ContractDetail contractData={contract} />
      </div>
    </div>
  )
}
