import React from 'react'
import Link from 'next/link'

function ContractsProfileComponent({ data }) {
  const contractsList = data.contracts

  return (
    <Link href={`/profile/contracts`}>
      <a>
        <div id="contracts" className="mb-8 border-b border-gray-300 cursor-pointer md:flex">
          <p className="text-base font-bold hover:text-blue-500">Contracts</p>
          <span className="ml-auto">{`${(contractsList && contractsList.length) ?? 0} Product(s)`}</span>
        </div>
      </a>
    </Link>
  )
}

export const ContractsProfile = ContractsProfileComponent
