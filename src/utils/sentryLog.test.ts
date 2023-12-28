import {SentryLogKey} from '@/types/sentry'
import {sentryLogData} from '@/utils/sentryLog'

describe('Sentry log whitelist', () => {
  it('With valid logkey', () =>
    expect(
      sentryLogData(SentryLogKey.pickingImageFailed, {
        code: '404',
        message: 'Not found',
        viaCamera: true,
      }),
    ).toStrictEqual({code: '404', message: 'Not found', viaCamera: true}))

  it('Filtering data', () =>
    expect(
      sentryLogData(SentryLogKey.currentCoordinates, {
        code: '404',
        message: 'Not found',
        viaCamera: true,
      }),
    ).toStrictEqual({code: '404', message: 'Not found'}))

  it('No data object', () =>
    expect(sentryLogData(SentryLogKey.currentCoordinates)).toStrictEqual(
      undefined,
    ))

  it('Empty data object', () =>
    expect(sentryLogData(SentryLogKey.currentCoordinates, {})).toStrictEqual(
      undefined,
    ))
})
