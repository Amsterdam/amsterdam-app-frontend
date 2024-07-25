import {pronounceCharacters} from './pronounceCharacters'

describe('accessibleNumber', () => {
  it('should return the number with spaces', () => {
    expect(pronounceCharacters(123456789)).toBe('1 2 3 4 5 6 7 8 9')
  })
  it('should return the text with spaces', () => {
    expect(pronounceCharacters('Mytext')).toBe('M y t e x t')
  })
  it('should work for zero', () => {
    expect(pronounceCharacters(0)).toBe('0')
  })
  it('should return empty string for undefined etc', () => {
    expect(pronounceCharacters(undefined as unknown as number)).toBe('')
    expect(pronounceCharacters(null as unknown as number)).toBe('')
  })
})
