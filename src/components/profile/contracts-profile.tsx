import React from 'react'
import { ContractCard } from '../contract-card'

function ContractsProfileComponent({ data }) {
  const contractsList = data.contracts
  contractsList.sort((contractA, contractB) => {
    const dateA = new Date(contractA.created)
    const dateB = new Date(contractB.created)
    return (dateA.getTime() - dateB.getTime()) * -1
  })
  return (
    <div id="contracts" className="mb-8">
      <p className="text-base font-bold">Contracts</p>
      <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
        {contractsList &&
          contractsList.map((contract, index) => {
            if (typeof contract === 'undefined') return null
            else return <ContractCard key={`contract-${index}`} contractData={contract} />
          })}
      </div>
    </div>
  )
}

export const ContractsProfile = ContractsProfileComponent
