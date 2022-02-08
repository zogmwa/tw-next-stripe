// word should be in singular form
export function formatConsideringPlurality(num: number, word: string) {
  if (num === 1) {
    return word
  }

  return word + 's'
}
