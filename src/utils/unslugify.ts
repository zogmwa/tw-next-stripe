// Add the abbreviated slugs of softwares which are needed to be capitalized in this list.
const abbreviatedSlugList = ['CRM']
export function unslugify(slug: string) {
  const result = slug.replace(/\-/g, ' ')

  if (abbreviatedSlugList.includes(result.toUpperCase())) {
    return result.replace(/\w\S*/g, function (txt) {
      return txt.toUpperCase()
    })
  } else {
    return result.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
}
