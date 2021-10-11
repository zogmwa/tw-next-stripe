import React from 'react'

function Page404() {
  return (
    <>
      <div className="py-20 flex flex-col md:flex-col">
        <p className="p-6 text-8xl font-normal text-text-secondary text-center">404</p>
        <p className="p-6 text-3xl font-light text-center">Sorry, this URL does not exist or is no longer available.</p>
        <p className="p-6 text-2xl font-light text-text-secondary text-center">
          Perhaps you were looking for one of the following sections:
        </p>
        <div className="flex flex-row list-none font-semibold p-4 grid grid-cols-2 gap-20 justify-items-stretch ">
          <div className="flex-1 px-6 justify-self-end">
            <li>Email Marketing</li>
            <li>Marketplace</li>
            <li>Affiliate Marketing</li>
            <li>Marketing</li>
            <li>Marketing Automation</li>
            <li>Communication</li>
            <li>Community</li>
            <li>Compliance</li>
            <li>E commerce</li>
            <li>Compute</li>
          </div>
          <div className="flex-1 px-6 justify-self-start">
            <li>Environmental Compliance</li>
            <li>Comission Free</li>
            <li>Investing</li>
            <li>Video Conferencing</li>
            <li>Video Streaming</li>
            <li>Png</li>
            <li>Image Search</li>
            <li>Images</li>
            <li>NFT</li>
          </div>
          {/* <div className="flex-0 px-6">
            <li>Video-conferencing</li>
            <li>Video-streaming</li>
            <li>Png</li>
            <li>Image-search</li>
            <li>Image</li>
            <li>Nft</li>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Page404
