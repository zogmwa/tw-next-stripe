export function validateLink(link: string) {
  if (link.indexOf('http://') === 0 || link.indexOf('https://') === 0) {
    return link
  }

  return 'https://' + link
}
