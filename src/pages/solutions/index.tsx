import React from 'react'
import { TopSolutionTags } from '@taggedweb/utils/top-tags'

export async function getServerSideProps(context) {
  const topSaasTagSlugs = []
  let url
  if (TopSolutionTags.length > 0) {
    for (let i = 0; i < TopSolutionTags.length; i++) topSaasTagSlugs.push(TopSolutionTags[i].slug)

    url = topSaasTagSlugs.join('--')
  }

  return {
    redirect: {
      permanent: false,
      destination: `solutions/${url}`,
    },
  }
}

export default function Software() {
  return <div>There are no Top Solution Tags.</div>
}
