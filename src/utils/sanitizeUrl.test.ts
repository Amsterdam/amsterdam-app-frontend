import {sanitizeUrl} from './sanitizeUrl'

describe('Sanitize Url', () => {
  it('Url without query', () =>
    expect(sanitizeUrl('https://www.google.com')).toStrictEqual(
      'https://www.google.com',
    ))
  it('Url with query', () =>
    expect(sanitizeUrl('https://www.google.com?q="number"')).toStrictEqual(
      'https://www.google.com',
    ))
  it('Url empty', () => expect(sanitizeUrl('')).toStrictEqual(''))
})
