import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Card from './blog-card'

export default {
  title: 'General/HomepageBlogCard',
  component: Card,
} as Meta

const cardDetails = {
  title: 'What are Cloud Migrations? Enterprise Cloud Adoption Benefits and Best Migration Strategies',
  readingTime: '9 min read',
  slug: 'what-are-cloud-migrations-enterprise-cloud-adoption-benefits-and-best-migration-strategies',
  description:
    'In this article AWS Certified Solutions Architect and former Amazon Software Engineer, Pranjal talks about the benefits for an enterprise migrating to migrate their infrastructure to the cloud and various cloud migration strategies.',
  imgSrc: 'https://d399t81zrp5fq3.cloudfront.net/Tagged_Web_Cloud_Migrations_4942e561a9.png',
}

export function DefaultBlogCardComponent() {
  return (
    <div className="w-5/12">
      <Card
        title={cardDetails.title}
        readtime={cardDetails.readingTime}
        href={''}
        description={cardDetails.description}
        imgSrc={cardDetails.imgSrc}
      />
    </div>
  )
}
