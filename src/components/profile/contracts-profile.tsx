import React from 'react'
import Link from 'next/link'

function ContractsProfileComponent({ data }) {
  const contractsList = data.contracts

  return (
    <Link href={'/profile/contracts'}>
      <a>
        <div id="contracts" className="flex mb-8 border-b border-gray-300 cursor-pointer">
          <p className="text-sm font-bold sm:text-base hover:text-blue-500">Contracts</p>
          <span className="ml-auto text-sm sm:text-base">{`${
            (contractsList && contractsList.length) ?? 0
          } Product(s)`}</span>
        </div>
      </a>
    </Link>
  )
}

export const ContractsProfile = ContractsProfileComponent
