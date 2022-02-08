// word should be in singular form
export function formatConsideringPlurality(num: number | string, word: string) {
  if (num === 1 || num === '1') {
    return num + ' ' + word
  }

  return num + ' ' + word + 's'
}
