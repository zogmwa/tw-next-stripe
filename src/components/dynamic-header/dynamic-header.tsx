import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

type DynamicHeaderComponentProps = {
  title?: string
  description?: string
}

// TODO: We should change this title and description before final launch.
function DynamicHeaderComponent({
  title = 'Software, SaaS Experts, Consultations, Solutions - TaggedWeb',
  description = 'Find Consultations, Solutions, Support and Integrations from the best software engineers, developers, certified specialists, marketers and SaaS experts. Find, integrate and utilize software tools that best fits your needs, tailored to your technology stack and needs.',
}: DynamicHeaderComponentProps) {
  const { asPath } = useRouter()
  return (
    <Head>
      <title>{title}</title>
      {process.env.NODE_ENV === 'development' && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TaggedWeb" />
      <meta property="og:image" content="/images/step_1.png" />
      <meta name="og:url" content={process.env.SITE_BASE_URL + asPath} />
      <meta name="og:logo" content="/images/taggedweb-logo.svg" />
    </Head>
  )
}

export const DynamicHeader = DynamicHeaderComponent
