import {SentryErrorLogKey} from '@/processes/sentry/types'
import {getFilteredSentryData, sanitizeUrl} from '@/processes/sentry/utils'

describe('Sentry log whitelist', () => {
  it('With valid logkey', () =>
    expect(
      getFilteredSentryData(SentryErrorLogKey.pickingImageFailed, {
        code: '404',
        message: 'Not found',
        viaCamera: true,
      }),
    ).toStrictEqual({code: '404', message: 'Not found', viaCamera: true}))

  it('Filtering data', () =>
    expect(
      getFilteredSentryData(SentryErrorLogKey.currentCoordinates, {
        code: '404',
        message: 'Not found',
        viaCamera: true,
      }),
    ).toStrictEqual({code: '404', message: 'Not found'}))

  it('No data object', () =>
    expect(
      getFilteredSentryData(SentryErrorLogKey.currentCoordinates),
    ).toStrictEqual(undefined))

  it('Empty data object', () =>
    expect(
      getFilteredSentryData(SentryErrorLogKey.currentCoordinates, {}),
    ).toStrictEqual(undefined))

  it('Empty sentry whitelist', () =>
    expect(
      getFilteredSentryData(SentryErrorLogKey.openMailUrl, {}),
    ).toStrictEqual(undefined))
})

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
