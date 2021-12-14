import React from 'react'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  let sitemapData
  try {
    const { data } = await clientWithRetries.get('/static/sitemap.xml')
    sitemapData = data
  } catch (error) {
    console.log('Could not fetch sitemap.xml file.')
  }

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemapData)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
