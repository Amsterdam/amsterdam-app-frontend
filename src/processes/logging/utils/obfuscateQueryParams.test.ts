import {obfuscateQueryParams} from '@/processes/logging/utils/obfuscateQueryParams'

describe('obfuscateQueryParams', () => {
  it('obfuscates all query param values in a URL', () => {
    expect(obfuscateQueryParams('https://example.com?foo=bar&baz=qux')).toBe(
      'https://example.com?foo=***&baz=***',
    )
  })

  it('obfuscates a single query param', () => {
    expect(obfuscateQueryParams('https://example.com?token=abc123')).toBe(
      'https://example.com?token=***',
    )
  })

  it('obfuscates multiple params with similar names', () => {
    expect(obfuscateQueryParams('https://example.com?a=1&aa=2&aaa=3')).toBe(
      'https://example.com?a=***&aa=***&aaa=***',
    )
  })

  it('obfuscates params in the middle of a string', () => {
    expect(obfuscateQueryParams('/api?foo=bar&baz=qux&x=y')).toBe(
      '/api?foo=***&baz=***&x=***',
    )
  })

  it('obfuscates URL-encoded params', () => {
    expect(
      obfuscateQueryParams(
        'https://example.com?report_code%3D123&vehicle_id%3D456',
      ),
    ).toBe('https://example.com?report_code%3D***&vehicle_id%3D***')
  })

  it('returns the input if there are no params', () => {
    expect(obfuscateQueryParams('https://example.com')).toBe(
      'https://example.com',
    )
  })

  it('returns undefined if input is undefined', () => {
    expect(obfuscateQueryParams(undefined)).toBeUndefined()
  })

  it('handles empty string', () => {
    expect(obfuscateQueryParams('')).toBe('')
  })
})
