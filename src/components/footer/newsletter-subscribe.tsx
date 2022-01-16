import React, { useState } from 'react'
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import * as Sentry from '@sentry/nextjs'

import { client } from '@taggedweb/utils/client'
export function SubscribeComponent() {
  const [contactEmail, setContactEmail] = useState<string>('')
  const [formDetails, setFormDetails] = useState<any>({ emailError: '', isSubscribed: false })

  const validate = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email) {
      setFormDetails({ ...formDetails, emailError: 'Email is required!' })
      return false
    } else if (!regex.test(email)) {
      setFormDetails({ ...formDetails, emailError: 'This is not a valid email format!' })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate(contactEmail)) {
      try {
        await client.post('/newsletter_contact/', { email: contactEmail })
        setFormDetails({ ...formDetails, isSubscribed: true })
      } catch (error) {
        Sentry.captureException(error)
        if (parseInt(error.response.status) === 400) {
          setFormDetails({ ...formDetails, emailError: 'This email user is already subscribed!' })
        } else if (parseInt(error.response.status) === 500) {
          console.log('Something went wrong, server error!')
        }
      }
    }
  }

  return (
    <div className="flex-col items-center px-6 py-4 mt-10 divide-y md:flex bg-primary divide-solid divide-border-default">
      <div className="flex flex-col items-start justify-between w-full py-4 pr-2 space-y-2 text-sm text-white sm:space-y-0 lg:flex-row">
        <div className="flex flex-col w-full space-y-2 sm:space-y-4 ">
          <h4 className="font-bold">SUBSCRIBE TO OUR NEWSLETTER</h4>
          <h4 className="text-sm text-white">
            Latest articles, news tips on useful Software, SaaS Integrations and more (you can always opt out later)!
          </h4>
        </div>
        {formDetails.isSubscribed ? (
          <div className="w-full py-4 font-bold text-md lg:text-right">
            <p>You&apos;ve successfully subscribed to TaggedWeb Newsletter!!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-start justify-between w-full py-2 space-x-3 lg:h-20 lg:w-240"
          >
            <div className="w-4/5 h-16 sm:w-11/12 lg:w-10/12">
              <input
                type="text"
                name="contact"
                placeholder="Enter your email"
                className="w-full py-3 pl-2 ml-1 text-sm text-gray-700 border-none rounded-md "
                value={contactEmail}
                onChange={(e) => {
                  setContactEmail(e.target.value)
                  setFormDetails({ ...formDetails, emailError: '' })
                }}
              />
              <p className="pt-1 pl-1 text-base font-bold text-red-500">
                {formDetails.emailError ? formDetails.emailError : ''}
              </p>
            </div>
            <button className="py-3 font-bold text-white text-opacity-100 bg-green-500 rounded-md w-28 lg:w-32 hover:bg-green-600">
              Subscribe
            </button>
          </form>
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full py-3 sm:flex-row sm:px-4">
        <div className="flex items-center copyright">
          <AiOutlineCopyrightCircle className="text-sm text-white" />
          <span className="text-white ext-sm ">{new Date().getFullYear()} TaggedWeb All rights reserved.</span>
        </div>
        <div className="flex justify-around py-1 ml-4 space-x-4 other-sites">
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
