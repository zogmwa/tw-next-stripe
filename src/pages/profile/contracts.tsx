import React from 'react'
import { useProfile } from '@taggedweb/hooks/use-profile'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Profile } from '@taggedweb/types/profile'
import { Breadcrumb } from '@taggedweb/components/breadcrumb'
import { ContractCard } from '@taggedweb/components/contract-card/contract-card'

export default function ContractsList() {
  const data = useProfile()
  const contractsList = data.contracts

  contractsList &&
    contractsList.sort((contractA, contractB) => {
      const dateA = new Date(contractA.started_at)
      const dateB = new Date(contractB.started_at)
      return (dateA.getTime() - dateB.getTime()) * -1
    })
  const breadcrumbData = [
    {
      name: 'Search',
      url: `${process.env.SITE_BASE_URL}/`,
      is_selected: false,
    },
    {
      name: 'Profile',
      url: `${process.env.SITE_BASE_URL}/profile/`,
      is_selected: false,
    },
    {
      name: 'Contracts',
      url: '#',
      is_selected: true,
    },
  ]
  const copyUrl = process.env.SITE_BASE_URL + '/profile/contracts'
  return (
    <div id="contracts" className="flex flex-col w-3/4 mx-auto xl:w-1/2 my-4 lg:my-8 min-h-[50%]">
      <Breadcrumb breadcrumbs={breadcrumbData} copyUrl={copyUrl} />
      <p className="my-2 text-lg font-bold">Contracts</p>
      <div className="w-full mb-4">
        {contractsList && contractsList.length === 0 && <p className="text-center">No Contracts yet...</p>}
        {contractsList &&
          contractsList.map((contract, index) => {
            if (typeof contract === 'undefined') return null
            else return <ContractCard key={`contract-${index}`} contractData={contract} />
          })}
      </div>
    </div>
  )
}
