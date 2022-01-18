import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { MeteredPaymentMethodConfirm } from './metered-payment-confirm'
import { Modal } from '../Modal'

export default {
  title: 'General/MeteredPaymentMethodConfirmModal',
  component: MeteredPaymentMethodConfirm,
} as Meta

export function DefaultReviewModal() {
  const [isshowConfirmModal, setIsShowConfrimModal] = React.useState(false)

  return (
    <>
      {' '}
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsShowConfrimModal(!isshowConfirmModal)}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50"
        >
          OPEN MODAL
        </button>
      </div>
      <Modal isOpen={isshowConfirmModal} setIsOpen={setIsShowConfrimModal} size="2xl" dialogTitle="Terms of service">
        <MeteredPaymentMethodConfirm
          paymentMethods={[]}
          setConfirmModalOpen={setIsShowConfrimModal}
          toggleSubScribe={() => {}}
        />
      </Modal>
    </>
  )
}
