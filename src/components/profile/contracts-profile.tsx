import React from 'react'
import Link from 'next/link'

function ContractsProfileComponent({ data }) {
  const contractsList = data.contracts

  return (
    <Link href="profile/contracts">
      <div id="contracts" className="mb-8 border-b border-gray-300 cursor-pointer md:flex">
        <p className="text-base font-bold">Contracts</p>
        <span className="ml-auto">{`${contractsList.length ?? 0} Product(s)`}</span>
      </div>
    </Link>
  )
}

export const ContractsProfile = ContractsProfileComponent
