import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

type DynamicHeaderComponentProps = {
  title?: string
  description?: string
}

// TODO: We should change this title and description before final launch.
function DynamicHeaderComponent({
  title = 'Shop around for SaaS Solutions, Software, Integrations, Consultations',
  description = 'Shop for the best SaaS Solutions and Cloud Software. Unblock your team with SaaS Integrations, Consultations, Usage Support and more from top engineers and domain experts.',
}: DynamicHeaderComponentProps) {
  const { asPath } = useRouter()
  return (
    <Head>
      <title>{title}</title>
      {process.env.NODE_ENV === 'development' && (
        <meta name="robots" content="noindex,nofollow" />
      )}
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
