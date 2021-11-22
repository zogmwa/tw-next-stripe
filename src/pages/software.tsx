import React from 'react'
import { TopSaasTags } from '@taggedweb/utils/top-tags'

export async function getServerSideProps(context) {
  const topSaasTagSlugs = []
  let url
  if (TopSaasTags.length > 0) {
    for (let i = 0; i < TopSaasTags.length; i++) topSaasTagSlugs.push(TopSaasTags[i].slug)

    url = topSaasTagSlugs.join(',')
  }

  return {
    redirect: {
      permanent: false,
      destination: `softwares/${url}`,
    },
  }
}

export default function Software() {
  return <div>There are no Top Saas Tags.</div>
}
