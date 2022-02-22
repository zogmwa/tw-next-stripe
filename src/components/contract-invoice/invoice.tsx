import React, { forwardRef } from 'react'

function InvoiceComponent({ contractData }, ref) {
  return (
    <div ref={ref} className="flex flex-col justify-between w-full bg-white py-12 px-10">
      <div>
        <h1 className="tracking-tight font-sans text-3xl font-extrabold leading-relaxed">
          Thank you for booking a solution on TaggedWeb!
        </h1>
        <p className="my-4 text-sm">
          Hi {contractData.booked_by.first_name}, Here is a summary of your recent booking on TaggedWeb. If you have any
          questions or concerns about your purchase, please contact us at <a href="mailto:">contact@taggedweb.com</a>
        </p>

        <p className="my-4 text-sm">
          Solution/Consultation Title: <b>{contractData.solution.title}</b>
        </p>
      </div>
      <div className="flex font-semibold flex-col my-12">
        <div className="flex items-center justify-between bg-bg_invoice py-3 px-6">
          <p>Booking #</p>
          <p className="w-20">{contractData.id}</p>
        </div>

        <div className="border-dashed border-b-2 border-t-2 border-gray-300 flex items-center justify-between py-3 px-6">
          <p>Total</p>
          <p className="w-20">${contractData.price_at_booking}</p>
        </div>
      </div>
    </div>
  )
}

export const Invoice = forwardRef(InvoiceComponent)
