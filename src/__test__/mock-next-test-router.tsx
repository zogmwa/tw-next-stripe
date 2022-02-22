import React from 'react'
import { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'

export function withTestRouter(tree: React.ReactElement, router: Partial<NextRouter> = {}) {
  // If we extract these values and don't use them ESLint throws an error, commenting it out in case we want to use them later
  const {
    route = '',
    pathname = '',
    query = {},
    asPath = '',
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    isFallback = false,
    basePath = '/',
    isLocaleDomain = false,
    prefetch = async () => undefined,
    beforePopState = () => null,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
    isReady = false,
    isPreview = false,
  } = router

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        isLocaleDomain,
        isFallback,
        basePath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        events,
        isReady,
        isPreview,
      }}
    >
      {tree}
    </RouterContext.Provider>
  )
}
