import { formatConsideringPlurality } from './formatConsideringPlurality'

test('If there is only one instance of an object then it returns the objects singular from, otherwise the plural form', () => {
  expect(formatConsideringPlurality(1, 'user')).toBe('user')
  expect(formatConsideringPlurality(2, 'user')).toBe('users')
  expect(formatConsideringPlurality(1, 'slot')).toBe('slot')
  expect(formatConsideringPlurality(5, 'slot')).toBe('slots')
})
