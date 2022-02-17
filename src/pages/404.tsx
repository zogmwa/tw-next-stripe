import React from 'react'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'

function Page404() {
  return (
    <>
      <DynamicHeader />
      <div className="flex flex-col py-20 md:flex-col">
        <p className="p-6 font-normal text-center text-8xl text-text-secondary">404</p>
        <p className="p-6 text-3xl font-light text-center">Sorry, this URL does not exist or is no longer available.</p>
      </div>
    </>
  )
}

export default Page404
