import React from 'react'
import { fetchSolutionList } from '@taggedweb/solution-queries/fetch-solution-list'
import { withSessionSSR } from '@taggedweb/utils/session'

export const getServerSideProps = withSessionSSR(async (context) => {
  const {
    params: { search_keywords },
  } = context

  const SplitTheString = (url) => {
    if (url != null) {
      const SplitChars = '--'
      return url.split(SplitChars)
    }
  }

  let solutionList
  try {
    const keywords = SplitTheString(search_keywords)
    const sendUrl = '?q=' + keywords.join('&q=')
    solutionList = await fetchSolutionList(context.req.session, sendUrl)
  } catch (error) {
    // eslint-disable-next-line
    // TODO: Redirect to solution search page.
  }
  return {
    props: { solutionList },
  }
})

export default function SolutionList({ solutionList }) {
  console.log(solutionList)
  return <div></div>
}
