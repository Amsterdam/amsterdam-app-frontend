import {isAmsterdamNlUrl, addAppParamsToUrl} from './addAppParamsToUrl'
import {ModuleSlug} from '@/modules/slugs'

describe('isAmsterdamNlUrl', () => {
  it('should return true for amsterdam.nl URLs', () => {
    expect(isAmsterdamNlUrl('https://amsterdam.nl')).toBe(true)
    expect(isAmsterdamNlUrl('http://subdomain.amsterdam.nl/path')).toBe(true)
    expect(isAmsterdamNlUrl('https://www.amsterdam.nl/?query=123')).toBe(true)
  })

  it('should return false for non-amsterdam.nl URLs', () => {
    expect(isAmsterdamNlUrl('https://amsterdam.com')).toBe(false)
    expect(isAmsterdamNlUrl('http://subdomain.example.com/path')).toBe(false)
    expect(isAmsterdamNlUrl('https://www.example.com/?query=123')).toBe(false)
  })
})

describe('addAppParamsToUrl', () => {
  it('should add app parameters to Amsterdam URLs without existing query string', () => {
    const url = 'https://amsterdam.nl'
    const slug: ModuleSlug = ModuleSlug.about
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe('https://amsterdam.nl?app_from=1&app_module=about')
  })

  it('should add app parameters to Amsterdam URLs with existing query string', () => {
    const url = 'https://amsterdam.nl/path?existing_param=value'
    const slug: ModuleSlug = ModuleSlug['waste-guide']
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe(
      'https://amsterdam.nl/path?existing_param=value&app_from=1&app_module=waste-guide',
    )
  })

  it('should omit the app_module param if it has no value', () => {
    const url = 'https://amsterdam.nl'
    const result = addAppParamsToUrl(url)

    expect(result).toBe('https://amsterdam.nl?app_from=1')
  })

  it('should return original URL for non-Amsterdam URLs', () => {
    const url = 'https://example.com'
    const slug: ModuleSlug = ModuleSlug.home
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe(url)
  })

  it('should handle a missing query string', () => {
    const url = 'https://amsterdam.nl?'
    const slug: ModuleSlug = ModuleSlug.about
    const result = addAppParamsToUrl(url, slug)

    expect(result).toBe('https://amsterdam.nl?app_from=1&app_module=about')
  })

  it('should pass through invalid formats', () => {
    const url1 = 'https://amsterdam.nl???'
    const url2 = 'https://amsterdam.nl?a=a?b=b'
    const slug: ModuleSlug = ModuleSlug.about
    const result1 = addAppParamsToUrl(url1, slug)
    const result2 = addAppParamsToUrl(url2, slug)

    expect(result1).toBe(url1)
    expect(result2).toBe(url2)
  })
})
