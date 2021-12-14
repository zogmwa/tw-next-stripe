import React from 'react'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  try {
    const { data } = await clientWithRetries.get('/static/sitemap.xml')
  } catch (error) {
    toast.error('Could not fetch sitemap.xml file.')
  }

  res.setHeader('Content-Type', 'text/xml')
  res.write(data)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
