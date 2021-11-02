import React from 'react'
import { withSessionSSR } from '../../../utils/session'
import { fetchServiceServer } from '../../../server-queries/fetch-service'
import { ServiceDetailCard } from '../../../components/service-card'
import { patchAssetField } from '../../../queries/service'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { slug },
  } = context
  const service = await fetchServiceServer(context.req.session, slug)
  const editAllowed = service?.edit_allowed ?? false

  if (!editAllowed) {
    return {
      redirect: {
        destination: `/services/${slug}`,
        permanent: false,
      },
    }
  }
  return {
    props: { service },
  }
})

export default function Service({ service }) {
  const editAllowed = service?.edit_allowed ?? false

  const handleChange = async (field, value) => {
    console.log('Field: ', field)
    console.log('Value: ', value)
    const data = await patchAssetField(field, value, service.slug)
    console.log(data)
  }

  return (
    <div className="min-h-full p-4 bg-background-light">
      <div className="max-w-screen-lg mx-auto">
        <ServiceDetailCard service={service} editAllowed={editAllowed} onChange={handleChange} />
      </div>
    </div>
  )
}
