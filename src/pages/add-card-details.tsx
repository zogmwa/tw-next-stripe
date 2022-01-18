import React from 'react'
import { useRouter } from 'next/router'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { withSessionSSR } from '@taggedweb/utils/session'
import { fetchSolutionDetail } from '@taggedweb/solution-queries/fetch-solution-detail'
import { AddPaymentCardDetail } from '@taggedweb/components/add-payment-card-detail'
import { Solution } from '@taggedweb/types/solution'
import { PaymentMethodAttachToUser } from '@taggedweb/queries/user'

export const getServerSideProps = withSessionSSR(async (context) => {
  const { query } = context
  if (!query?.slug) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  const slug = query?.slug
  let solutionDetail: Solution
  try {
    solutionDetail = await fetchSolutionDetail(context.req, slug)
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    }
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: {
      solutionDetail,
    },
  }
})

export default function AddCardDetailsPage({ solutionDetail }) {
  const router = useRouter()
  const { authVerified } = useUserContext()
  if (!solutionDetail || typeof solutionDetail === 'undefined' || !solutionDetail.is_metered) return null

  const addCard = async (paymentMethod) => {
    const data = await PaymentMethodAttachToUser(paymentMethod.id)
  }

  if (!authVerified) return null

  return (
    <div className="flex md:flex-row flex-col max-w-screen-lg px-4 mx-auto my-6 divide md:divide-x divide-border-default md:my-24">
      <div className="flex flex-col w-full">
        <div
          className="flex space-x-2 items-center hover:underline cursor-pointer"
          onClick={() => {
            router.push(`/solution/${solutionDetail.slug}`)
          }}
        >
          <BsArrowLeftCircle className="border border-border-default rounded-full text-text-primary text-lg" />
          <span className="text-sm text-text-primary">Go back</span>
        </div>
        <h2 className="text-lg text-text-primary font-semibold md:p-2 py-4">{solutionDetail.title}</h2>
        <div className="flex md:p-2 py-2">
          <span className="ml-2 text-sm text-text-primary">Team size: </span>
          <span className="ml-2 text-sm font-semibold">{solutionDetail.team_size}</span>
        </div>
        <div className="flex md:p-2 py-2">
          <span className="ml-2 text-sm text-text-primary">Estimated hours: </span>
          <span className="ml-2 text-sm font-semibold">{solutionDetail.estimated_hours}</span>
        </div>
        <div className="flex md:p-2 py-2">
          <span className="ml-2 text-sm text-text-primary">Blended hourly rate: </span>
          <span className="ml-2 text-sm font-semibold">{`$ ${solutionDetail.blended_hourly_rate}`}</span>
        </div>
        <div className="flex md:p-2 py-2">
          <span className="ml-2 text-sm text-text-primary">Billing period: </span>
          <span className="ml-2 text-sm font-semibold">{solutionDetail.billing_period}</span>
        </div>
      </div>
      <div className="flex flex-col w-full md:px-4 py-10 md:py-0 border-t border-border-default md:border-0 justify-center">
        <span className="text-text-primary text-md font-semibold">Add Card Info</span>
        <AddPaymentCardDetail addCard={addCard} />
      </div>
    </div>
  )
}
