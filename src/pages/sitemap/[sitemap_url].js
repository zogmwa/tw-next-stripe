import axios from 'axios'
import { withSessionSSR } from '@taggedweb/utils/session'
import * as Sentry from '@sentry/nextjs'

const SubSitemap = () => {}

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    res,
    params: { sitemap_url },
  } = context

  try {
    const { data: googleData } = await axios.get(`https://taggedweb.s3.amazonaws.com/static/${sitemap_url}`)

    res.setHeader('Content-Type', 'text/xml')
    res.write(googleData)
    res.end()

    return {
      props: {},
    }
  } catch (error) {
    Sentry.captureException(error)

    return {
      props: {
        notFound: true,
      },
    }
  }
})

export default SubSitemap
