import axios from 'axios'
import { withSessionSSR } from '@taggedweb/utils/session'

const SubSitemap = () => {}

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    res,
    params: { sitemap_url },
  } = context
  const { data: googleData } = await axios.get(`https://taggedweb.s3.amazonaws.com/static/${sitemap_url}`)

  res.setHeader('Content-Type', 'text/xml')
  res.write(googleData)
  res.end()

  return {
    props: {},
  }
})

export default SubSitemap
