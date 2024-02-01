import {
  sanitizeUrl,
  getSanitizedQueryString,
  getSanitizedHashString,
} from './sanitizeUrl'

describe('getSanitizedQueryString', () => {
  test('should return an empty string when given an empty query string', () => {
    const result = getSanitizedQueryString('')

    expect(result).toBe('')
  })

  test('should replace all values with "___" in the query string', () => {
    const query = 'foo=bar&quux=1'
    const result = getSanitizedQueryString(query)

    expect(result).toBe('?foo=___&quux=___')
  })

  test('should handle special characters in the query string', () => {
    const query = 'foo=%20bar%20&quux=%311'
    const result = getSanitizedQueryString(query)

    expect(result).toBe('?foo=___&quux=___')
  })

  test('should handle undefined input gracefully', () => {
    const result = getSanitizedQueryString(undefined)

    expect(result).toBe('')
  })
})

describe('getSanitizedHashString', () => {
  test('should return an empty string when given an empty hash string', () => {
    const result = getSanitizedHashString('')

    expect(result).toBe('')
  })

  test('should replace all values with "___" in the hash string', () => {
    const hash = 'foo/bar/quux'
    const result = getSanitizedHashString(hash)

    expect(result).toBe('#___/___/___')
  })

  test('should handle special characters in the hash string', () => {
    const hash = '%20value%20/%3Dvalue%3D'
    const result = getSanitizedHashString(hash)

    expect(result).toBe('#___/___')
  })

  test('should handle undefined input gracefully', () => {
    const result = getSanitizedHashString(undefined)

    expect(result).toBe('')
  })
})

describe('sanitizeUrl', () => {
  test('should return the original URL if it does not contain a query string or hash', () => {
    const url = 'https://example.com/path/to/page'
    const result = sanitizeUrl(url)

    expect(result).toBe(url)
  })

  test('should replace values with "___" in the query string and hash, keeping the rest of the URL intact', () => {
    const url =
      'https://example.com/path/to/page?foo=bar&quux=1#section1/section2'
    const result = sanitizeUrl(url)

    expect(result).toBe(
      'https://example.com/path/to/page?foo=___&quux=___#___/___',
    )
  })

  test('should handle URLs with fragments only, stripping hashes', () => {
    const url = 'https://example.com/path/to/page#section1'
    const result = sanitizeUrl(url)

    expect(result).toBe('https://example.com/path/to/page#___')
  })

  test('should handle nonsense input gracefully', () => {
    expect(
      sanitizeUrl('https://example.com/path/to/page#section1#section2'),
    ).toBe('https://example.com/path/to/page')
    expect(
      sanitizeUrl('https://example.com/path/to/page?foo=bar?foo=quux'),
    ).toBe('https://example.com/path/to/page')
  })
})
