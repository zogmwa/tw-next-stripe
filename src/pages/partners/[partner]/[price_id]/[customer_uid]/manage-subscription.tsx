import React, { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { withSessionSSR } from '@taggedweb/utils/session'
import Card from '@taggedweb/components/card/card'
import { Button } from '@taggedweb/components/button'
import { toggleAssetSubscriptionPauseOrResume } from '@taggedweb/queries/user'
import { fetchAssetSubscriptionData } from '@taggedweb/server-queries/fetch-asset-subscription-data'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { partner, price_id, customer_uid },
    query: { session_id },
  } = context
  let pageData
  try {
    pageData = await fetchAssetSubscriptionData(context.req, customer_uid, price_id, session_id)
    if (!pageData.is_subscribe)
      return {
        redirect: {
          destination: `/partners/${partner}/${price_id}/${customer_uid}/start-plan-subscription?session_id=${session_id}`,
          permanent: false,
        },
        props: {},
      }
  } catch (error) {
    return {
      notFound: true,
    }
    // eslint-disable-next-line
    // TODO: Redirect to subscribe asset price plan page.
  }
  return {
    props: { pageData },
  }
})

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000)
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate()
  var time = month + ' ' + date + ', ' + year
  return time
}

export default function ManageSubscription({ pageData }) {
  const { query } = useRouter()
  const [isPauseOrResume, setIsPauseOrResume] = useState(false)
  const [isPaused, setIsPaused] = useState(pageData.is_pause)

  const PauseOrResumecontractController = async (pauseStatus) => {
    setIsPauseOrResume(true)
    const data = await toggleAssetSubscriptionPauseOrResume(
      query.session_id,
      query.price_id,
      query.customer_uid,
      pauseStatus,
    )
    if (data.status === 'subscription paused' || data.status === 'subscription resumed') {
      if (data.status === 'subscription paused') {
        setIsPaused(true)
      } else {
        setIsPaused(false)
      }
      toast.success(data.status)
    } else {
      toast.error(data.status)
    }
    setIsPauseOrResume(false)
  }

  return (
    <div className="flex flex-col max-w-screen-lg px-4 mx-auto my-6 md:my-16">
      <div className="flex flex-col md:flex-row">
        <Card
          subTitle="Card On File"
          title={`**** **** **** ${pageData.card_info.last4}`}
          linkTitle="Update Card"
          href={`/partners/${query.partner}/${query.price_id}/${query.customer_uid}/add-payment-method?session_id=${query.session_id}`}
        />
        <Card
          subTitle="Next Billing Date"
          title={timeConverter(pageData.current_period_end)}
          description={`Current Period: ${timeConverter(pageData.current_period_start)} - ${timeConverter(
            pageData.current_period_end,
          )}`}
        />
        <div className="flex flex-col p-4">
          <div className="flex flex-col">
            {isPaused ? (
              <Button
                disabled={isPauseOrResume}
                loading={isPauseOrResume}
                onClick={() => PauseOrResumecontractController('resume')}
                loadingClassName="text-primary"
              >
                Resume Contract
              </Button>
            ) : (
              <Button
                disabled={isPauseOrResume}
                loading={isPauseOrResume}
                onClick={() => PauseOrResumecontractController('pause')}
                loadingClassName="text-primary"
              >
                Pause Contract
              </Button>
            )}
            <Button className="mt-2 !border-red-600" textClassName="!text-red-600">
              Cancel Contract
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex shadow-sm mt-4">
        <table className="table-auto w-full border-collapse border border-border-default rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {pageData.invoices.map((invoice, index) => (
              <tr>
                <td className="border px-4 py-2">{timeConverter(invoice.created)}</td>
                <td className="border px-4 py-2">${invoice.total / 100}</td>
                <td className="border px-4 py-2">{invoice.status}</td>
                <td className="border px-4 py-2">Down</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
