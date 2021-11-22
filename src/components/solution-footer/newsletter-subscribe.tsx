import React, { useState } from 'react'
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'

export function SubscribeComponent() {
  const [contactEmail, setContactEmail] = useState<string>('')

  return (
    <div className="flex-col items-center px-6 py-4 mt-10 divide-y md:flex bg-primary divide-solid divide-border-default">
      <div className="flex flex-col items-start justify-between w-full py-4 pr-2 space-y-2 text-sm text-white sm:space-y-0 lg:flex-row">
        <div className="flex flex-col w-full space-y-2 sm:space-y-4 ">
          <h4 className="font-bold">SUBSCRIBE TO OUR NEWSLETTER</h4>
          <h4 className="text-sm text-white">Latest news, articles, and resources, sent to your inbox weekly</h4>
        </div>
        <div className="flex items-center justify-between w-full py-2 space-x-3 lg:h-16 lg:w-240">
          <input
            type="email"
            name="contact"
            placeholder="Enter your email"
            className="w-4/5 py-3 pl-2 text-sm text-gray-700 border-none rounded-md sm:w-11/12 lg:w-10/12 "
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <button className="px-4 py-3 font-bold text-white text-opacity-100 bg-green-500 rounded-md">Subscribe</button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full py-3 sm:flex-row sm:px-4">
        <div className="flex items-center pt-2 copyright">
          <AiOutlineCopyrightCircle className="text-sm text-white" />
          <span className="text-white ext-sm ">2021 TaggedWeb All rights reserved.</span>
        </div>
        <div className="flex justify-around py-1 space-x-4 other-sites">
          <a
            href="https://twitter.com/TheTaggedWeb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 no-underline"
          >
            <BsTwitter className="p-1 text-2xl text-white rounded-full" />
          </a>
          <a
            href="https://www.linkedin.com/company/taggedweb/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 no-underline"
          >
            <BsLinkedin className="p-1 text-2xl text-white rounded-full" />
          </a>
          <a
            href="https://www.facebook.com/taggedweb/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 no-underline"
          >
            <BsFacebook className="p-1 text-2xl text-white rounded-md" />
          </a>
        </div>
      </div>
    </div>
  )
}
