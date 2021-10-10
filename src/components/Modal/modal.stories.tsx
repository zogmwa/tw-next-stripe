import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Modal } from './modal'

export default {
  title: 'General/Modal',
  component: Modal,
} as Meta

export function DefaultReviewModal() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {' '}
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50"
        >
          OPEN MODAL
        </button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>ABCD</div>
      </Modal>
    </>
  )
}
