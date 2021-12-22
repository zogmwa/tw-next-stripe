import React from 'react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

export function withTestRouter(tree, router) {
  const { route = '', pathname = '', query = {}, asPath = '' } = router

  return <RouterContext.Provider value={router}>{tree}</RouterContext.Provider>
}
