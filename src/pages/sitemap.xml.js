import React from 'react'
import axios from 'axios'
import { clientWithRetries } from '@taggedweb/utils/clientWithRetries'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const { data } = await clientWithRetries.get('/static/sitemap.xml')

  console.log(googleData)
  res.setHeader('Content-Type', 'text/xml')
  res.write(data)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
