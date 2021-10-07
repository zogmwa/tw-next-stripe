import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { AiFillLinkedin, AiFillGoogleSquare, AiOutlineClose } from 'react-icons/ai'
import { Button } from '../button'
import { handleGoogleLogin, handleLinkedInLogin } from '../../utils/login'
import Link from 'next/link'

function AuthenticationPopupComponent() {
  let [isOpen, setIsOpen] = useState(true)

  const { query } = useRouter()
  const { linkedInError, googleError } = query as { linkedInError: string; googleError: string }

  const router = useRouter()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex py-6 items-center justify-between">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Post review
                  </Dialog.Title>
                  <button className="focus:ring-white">
                    <AiOutlineClose type="button" onClick={closeModal} />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Right now we only allow professional users to post review. To continue posting a review
                  </p>
                </div>
                <br />
                <div>
                  <p className="text-xs text-center text-error">{linkedInError}</p>
                  <Button
                    icon={<AiFillLinkedin size={20} />}
                    buttonType="primary"
                    iconPlacement="right"
                    className="w-full !bg-[#0077B5] !border-[#0077B5] !flex mb-4"
                    onClick={handleLinkedInLogin}
                  >
                    Login with LinkedIn
                  </Button>
                  <p className="text-xs text-center text-error">{googleError}</p>
                  <Button
                    icon={<AiFillGoogleSquare size={20} />}
                    buttonType="primary"
                    iconPlacement="right"
                    className="w-full !bg-[#DB4437] !border-[#DB4437] !flex mb-4"
                    onClick={handleGoogleLogin}
                  >
                    Login with Google
                  </Button>
                  <Link href="/signup">
                    <Button
                      buttonType="primary"
                      iconPlacement="right"
                      className="w-full !bg-[#fff] !text-[#3b82f6] !border-[#3b82f6] !flex mb-4"
                    >
                      Sign Up with Business Email
                    </Button>
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const AuthenticationPopup = AuthenticationPopupComponent
