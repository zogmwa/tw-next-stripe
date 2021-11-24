import React from 'react'
import Head from 'next/head'

type DynamicHeaderComponentProps = {
  title?: string
  description?: string
}

function DynamicHeaderComponent({
  title = 'Shop around for SaaS Solutions, Software, Integrations, Consultations',
  description = 'Shop for the best SaaS Solutions and Cloud Software. Unblock your team with SaaS Integrations, Consultations, Usage Support and more from top engineers and domain experts.',
}: DynamicHeaderComponentProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  )
}

export const DynamicHeader = DynamicHeaderComponent
