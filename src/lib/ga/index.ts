declare const window: any
// log the pageview with their URL
export const pageview: GA_PageView = (url) => {
  window.gtag('config', 'G-CJ16362SSH', {
    page_path: url,
  })
}

// log specific events happening.
export const event: GA_Event = ({ action, params }) => {
  window.gtag('event', action, params)
}

export type GA_PageView = (url: any) => void
export type GA_Event = (object: { action: any; params: any }) => void
