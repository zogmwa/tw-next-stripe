import React from 'react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

export function withTestRouter(tree, router) {
  // If we extract these values and don't use them ESLint throws an error, commenting it out in case we want to use them later
  // const { route, pathname, query, asPath } = router

  return <RouterContext.Provider value={router}>{tree}</RouterContext.Provider>
}
