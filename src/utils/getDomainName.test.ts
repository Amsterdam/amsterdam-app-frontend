import {getDomainName} from '@/utils/getDomainName'

const DOMAIN = 'www.example.com'

describe('getDomainName', () => {
  test('should return null if the URL is null', () => {
    expect(getDomainName(null)).toBeNull()
  })

  test('should return null if the URL is undefined', () => {
    expect(getDomainName()).toBeNull()
  })

  test('should return the domain name for a valid HTTP URL', () => {
    expect(getDomainName(`http://${DOMAIN}`)).toBe(DOMAIN)
  })

  test('should return the domain name for a valid HTTPS URL', () => {
    expect(getDomainName(`https://${DOMAIN}`)).toBe(DOMAIN)
  })

  test('should return the domain name for a URL with path and query', () => {
    expect(getDomainName(`https://${DOMAIN}/path?query=1`)).toBe(DOMAIN)
  })

  test('should return the original URL if it does not match the regex', () => {
    expect(getDomainName(`ftp://example.com`)).toBe('ftp://example.com')
  })

  test('should return the original URL if it is not a valid URL', () => {
    expect(getDomainName('not a url')).toBe('not a url')
  })
})
