/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { fetchContract } from '@taggedweb/solution-queries/fetch-contract'
import { withSessionSSR } from '@taggedweb/utils/session'
import { ContractCard } from '@taggedweb/components/contract-card/contract-card'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import Pagination from '@mui/material/Pagination'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'
import { useUserContext } from '@taggedweb/hooks/use-user'
import Page404 from '@taggedweb/pages/404'
export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    query: { user },
  } = context
  const sendUrl = '&offest=0&limit=5'
  const contractData = (await fetchContract(context.req, sendUrl)) ?? []

  return {
    props: { contractData },
  }
})

export default function ContractsList({ contractData }) {
  const router = useRouter()
  const session = useUserContext()
  const { isLoggedIn, logout } = session
  const [contractsList, setContractsList] = useState(contractData)
  const [page, setPage] = useState(1)
  const [pageLen, setPageLen] = useState(5)
  const [pageCount, setPageCount] = useState(Math.ceil(contractsList.count / pageLen))

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
  // contractsList.sort((contractA, contractB) => {
  //   const dateA = new Date(contractA.started_at)
  //   const dateB = new Date(contractB.started_at)
  //   return (dateA.getTime() - dateB.getTime()) * -1
  // })

  contractsList.results &&
    contractsList.results.sort((contractA, contractB) => {
      const dateA = new Date(contractA.created)
      const dateB = new Date(contractB.created)
      return (dateA.getTime() - dateB.getTime()) * -1
    })
  const fetchContractsList = async (sendUrl) => {
    try {
      const { data } = await axios.get(`/api/contracts/${sendUrl}`)
      setPageCount(Math.ceil(contractsList.count / pageLen))
      setContractsList(data)
    } catch (error) {
      Sentry.captureException(error)
      // eslint-disable-next-line
      console.log(error)
    }
  }

  const handlePagination = (event, pageValue) => {
    setPage(pageValue)
    const offset = (pageValue - 1) * pageLen
    const sendUrl = `offset=${offset}&limit=${pageLen}`
    fetchContractsList(sendUrl)
  }
  useEffect(() => {
    const { pathname } = Router
    if (!session.isLoggedIn() && pathname === '/profile/contracts') {
      router.replace('/login')
    }
  }, [session, router])

  if (isLoggedIn()) {
    return (
      <div id="contracts" className="flex flex-col w-3/4 mx-auto xl:w-1/2 my-4 lg:my-8 min-h-[50%]">
        <Breadcrumb breadcrumbs={breadcrumbData} className="mb-4" mobileAct={false} />
        <p className="my-2 text-lg font-bold">Contracts</p>
        <div className="w-full mb-4">
          {((contractsList?.results && contractsList.results.length === 0) ||
            typeof contractsList?.results === 'undefined') && <p className="text-center">No Contracts yet...</p>}

          {contractsList.results &&
            contractsList.results.map((contract, index) => {
              return (
                <ContractCard
                  key={`contract-${index}`}
                  contractData={contract}
                  redirectUrl={`/profile/contracts/${contract.id}`}
                />
              )
            })}

          <div className="flex justify-end p-2">
            {pageCount > 1 && <Pagination page={page} count={pageCount} onChange={handlePagination} />}
          </div>
        </div>
      </div>
    )
  } else {
    return <Page404 />
  }
}
