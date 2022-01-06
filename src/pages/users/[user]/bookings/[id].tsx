import React from 'react'
import { useRouter } from 'next/router'
import * as Sentry from '@sentry/nextjs'
import { fetchContract } from '@taggedweb/solution-queries/fetch-contract'
import { withSessionSSR } from '@taggedweb/utils/session'
import { ContractDetail } from '@taggedweb/components/contract-detail'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import { unslugify } from '@taggedweb/utils/unslugify'

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
    Sentry.captureException(err)
    return {
      props: {},
    }
  }
})

export default function Contracts({ contractData }) {
  const { query } = useRouter()
  const { user } = query
  const contract = contractData[0]
  const breadcrumbData = [
    {
      name: 'Profile',
      url: '/profile',
      is_selected: false,
    },
    {
      name: 'Bookings List',
      url: `/users/${user}/bookings`,
      is_selected: false,
    },
    {
      name: contract.id,
      url: '#',
      is_selected: true,
    },
  ]

  return (
    <div id="contracts" className="flex flex-col max-w-screen-lg px-2 mx-auto my-10">
      <Breadcrumb breadcrumbs={breadcrumbData} className="mb-4" mobileAct={false} />
      <p className="mb-2 text-xl font-bold">Contract Detail</p>
      <div className="w-full mb-4">
        <ContractDetail contractData={contract} />
      </div>
    </div>
  )
}
