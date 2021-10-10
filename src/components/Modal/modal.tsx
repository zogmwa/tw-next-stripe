import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type ModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  dialogTitle?: string
  modalDescription?: string
  // eslint-disable-next-line no-undef
  children: React.ReactChild
}

function ModalComponent({ isOpen, setIsOpen, dialogTitle, modalDescription, children }: ModalProps) {
  function closeModal() {
    setIsOpen(false)
  }
  return (
    <>
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
                <div className="flex items-center justify-between">
                  {dialogTitle !== undefined ? (
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {dialogTitle}
                    </Dialog.Title>
                  ) : (
                    ''
                  )}
                  <button className="focus:ring-white ml-auto mb-6">
                    <AiOutlineClose type="button" onClick={closeModal} />
                  </button>
                </div>

                {modalDescription !== undefined ? (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{modalDescription}</p>
                    <br />
                  </div>
                ) : (
                  ''
                )}
                <div>{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const Modal = ModalComponent
