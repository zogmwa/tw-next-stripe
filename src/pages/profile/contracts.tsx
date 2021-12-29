import React from 'react'
import { ContractCard } from '../../components/contract-card/contract-card'
import { useProfile } from '@taggedweb/hooks/use-profile'
import { Profile } from '@taggedweb/types/profile'

export default function ContractsList() {
  const data = useProfile()
  const contractsList = data.contracts

  contractsList &&
    contractsList.sort((contractA, contractB) => {
      const dateA = new Date(contractA.created)
      const dateB = new Date(contractB.created)
      return (dateA.getTime() - dateB.getTime()) * -1
    })

  return (
    <div id="contracts" className="flex flex-col w-3/4 mx-auto xl:w-1/2 my-4 lg:my-8 min-h-[50%]">
      <p className="mb-2 text-lg font-bold">Contracts</p>
      <div className="w-full mb-4">
        {contractsList && contractsList.length == 0 && <p className="text-center">No Contracts yet...</p>}
        {contractsList &&
          contractsList.map((contract, index) => {
            if (typeof contract === 'undefined') return null
            else return <ContractCard key={`contract-${index}`} contractData={contract} />
          })}
      </div>
    </div>
  )
}
