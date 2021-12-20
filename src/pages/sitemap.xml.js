import React from 'react'
import axios from 'axios'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const { data: googleData } = await axios.get(`https://taggedweb.s3.amazonaws.com/static/sitemap.xml`)

  res.setHeader('Content-Type', 'text/xml')
  res.write(googleData)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
