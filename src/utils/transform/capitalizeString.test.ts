import {capitalizeString} from '@/utils/transform/capitalizeString'

describe('capitalizeString', () => {
  test('capitalizes the first character of a string', () => {
    expect(capitalizeString('test')).toBe('Test')
  })

  test('does not modify a string that is already capitalized', () => {
    expect(capitalizeString('Test')).toBe('Test')
  })

  test('leaves an empty string as is', () => {
    expect(capitalizeString('')).toBe('')
  })

  test('leaves a string with only one character capitalized', () => {
    expect(capitalizeString('t')).toBe('T')
  })

  test('works when undefined or null is passed', () => {
    expect(capitalizeString(undefined as unknown as string)).toBe('')
    expect(capitalizeString(null as unknown as string)).toBe('')
  })
})
