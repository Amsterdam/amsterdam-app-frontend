import {getFilteredSentryData} from '@/processes/sentry/getFilteredSentryData'
import {SentryErrorLogKey} from '@/processes/sentry/types'

describe('Sentry log whitelist', () => {
  it('With valid logkey', () =>
    expect(
      getFilteredSentryData(SentryErrorLogKey.pickingImageFailed, {
        error: 'Not found',
        code: '404',
        viaCamera: true,
      }),
    ).toStrictEqual({error: 'Not found', code: '404', viaCamera: true}))

  it('Filtering data', () =>
    expect(
      getFilteredSentryData(SentryErrorLogKey.currentCoordinates, {
        code: '404',
        message: 'Not found',
        error: 'Not found',
      }),
    ).toStrictEqual({error: 'Not found'}))

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
