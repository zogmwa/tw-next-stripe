import React from 'react'
import { fetchServicesDetailCompareServer } from '../server-queries/fetch-services-compare-detail'

export const getServerSideProps = async ({ query }) => {
  /*
    ** https://github.com/vercel/next.js/discussions/13301
    ** Because of this I added favicon to /public
  */
  const { services: serviceSlugs } = query
  const servicesUrl = '?asset__slugs=' + serviceSlugs.join('&asset__slugs=')
  const services = await fetchServicesDetailCompareServer(servicesUrl)
  return {
    props: { services },
  }
}

export default function CompareList({ services }) {

  return <></>
}
