declare const window: any
// log the pageview with their URL
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.googleTagManager, {
      page_path: url,
    })
  }
}

export type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}
// log specific events happening.
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
