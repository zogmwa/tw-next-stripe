import React from 'react'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'
import { Button } from '../../components/button/button'
import 'reactjs-freshchat/dist/index.css'

export default function Software() {
  return (
    <>
      <DynamicHeader
        title="About TaggedWeb"
        description="Shop around for SaaS solutions, integrations, consultations, usage support and more. | TaggedWeb"
      />

      <div className="flex flex-col items-center mx-5 my-10">
        <div className="mb-10 space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">About TaggedWeb</h1>
          <p>Our mission is to help you find and utilize SaaS web services that best fit your needs.</p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-500">What We Do?</h2>
            <p>Shop around for SaaS solutions, integrations, consultations, usage support and more.</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-500">Why should you trust us?</h2>
            <p>Shop around for SaaS solutions, integrations, consultations, usage support and more.</p>
          </div>
        </div>
      </div>
    </>
  )
}
