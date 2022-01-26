import React from 'react'
import Link from '@taggedweb/components/Link'
import Card from './blog-card'

const Blogs = [
  {
    title: 'What are Cloud Migrations? Enterprise Cloud Adoption Benefits and Best Migration Strategies',
    readingTime: '9 min read',
    slug: 'what-are-cloud-migrations-enterprise-cloud-adoption-benefits-and-best-migration-strategies',
    description:
      'In this article AWS Certified Solutions Architect and former Amazon Software Engineer, Pranjal talks about the benefits for an enterprise migrating to migrate their infrastructure to the cloud and various cloud migration strategies.',
    imgSrc: 'https://d399t81zrp5fq3.cloudfront.net/Tagged_Web_Cloud_Migrations_4942e561a9.png',
  },
  {
    title: 'What are the key features that the Best Customer Relationship Management (CRM) Software offer?',
    readingTime: '4 min read',
    slug: 'what-are-the-key-features-that-the-best-customer-relationship-management-(crm)-software-offer',
    description:
      'In this post we look at the key features that the best Customer Relationship Management (CRM) offer or should offer.',
    imgSrc: 'https://d399t81zrp5fq3.cloudfront.net/crm_customer_lifecycle_f8e02042c0.jpeg',
  },
  {
    title: 'HTTP to HTTPS, Add an SSL Certificate to your Nginx Hosted Website with Lets Encrypt',
    readingTime: '4 min read',
    slug: 'http-to-https-add-an-ssl-certificate-to-your-nginx-hosted-website-with-lets-encrypt',
    description:
      'In this post we explain how in a few steps you can set up your website with HTTPS certificates using Lets Encrypt as a Certificate Authority. For this post we focus on the step for a single instance serving your website via Nginx.',
    imgSrc: 'https://d399t81zrp5fq3.cloudfront.net/Tagged_Web_HTTPS_Support_Lets_Encrypt_Example_8957390e3e.png',
  },
  {
    title: 'Top Questions to ask when Buying and Procuring Software or Signing a SaaS Contract',
    readingTime: '6 min read',
    slug: 'top-questions-to-ask-when-buying-and-procuring-software-or-signing-a-saas-contract',
    description:
      'In this post former Amazon and GoodRx engineer Pranjal Mittal discusses top questions a business must ask when procuring software for their needs.',
    imgSrc: '',
  },
]

export function HomepageBlog() {
  return (
    <div className="py-8 bg-gray-50">
      <div className="relative max-w-screen-lg px-2 mx-auto">
        <div className="mt-4 mb-10 text-2xl font-bold text-center">
          <Link href={`${process.env.SITE_BASE_URL}/blog`}>
            <span className="text-black">Blog</span>
          </Link>
        </div>
        <div className="flex flex-col space-y-4 md:hidden">
          {Blogs.map((blog, index) => (
            <div key={index}>
              <Card
                title={blog.title}
                href={`${process.env.SITE_BASE_URL}/blog/posts/${blog.slug}`}
                readtime={blog.readingTime}
                description={blog.description}
                imgSrc={blog.imgSrc}
              />
            </div>
          ))}
        </div>
        <div className="hidden gap-3 md:grid md:grid-cols-2">
          <div className="flex flex-col">
            <Card
              title={Blogs[0].title}
              href={`${process.env.SITE_BASE_URL}/blog/posts/${Blogs[0].slug}`}
              readtime={Blogs[0].readingTime}
              description={Blogs[0].description}
              imgSrc={Blogs[0].imgSrc}
            />
            <Card
              title={Blogs[1].title}
              href={`${process.env.SITE_BASE_URL}/blog/posts/${Blogs[1].slug}`}
              readtime={Blogs[1].readingTime}
              description={Blogs[1].description}
              imgSrc={Blogs[1].imgSrc}
            />
          </div>
          <div className="flex flex-col">
            <Card
              title={Blogs[3].title}
              href={`${process.env.SITE_BASE_URL}/blog/posts/${Blogs[3].slug}`}
              readtime={Blogs[3].readingTime}
              description={Blogs[3].description}
              imgSrc={Blogs[3].imgSrc}
            />
            <Card
              title={Blogs[2].title}
              href={`${process.env.SITE_BASE_URL}/blog/posts/${Blogs[2].slug}`}
              readtime={Blogs[2].readingTime}
              description={Blogs[2].description}
              imgSrc={Blogs[2].imgSrc}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
