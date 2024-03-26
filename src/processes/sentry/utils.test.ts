import type {ErrorEvent} from '@sentry/types'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {
  getEventWithoutFreeStorageForIos,
  getFilteredSentryData,
} from '@/processes/sentry/utils'

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

describe('getEventWithoutFreeStorageForIos', () => {
  it('should set free_storage to 0 if it exists in device context', () => {
    const errorEventWithStorage = {
      contexts: {
        device: {
          free_storage: 100,
        },
      },
    } as ErrorEvent

    const result = getEventWithoutFreeStorageForIos(errorEventWithStorage)

    expect(result.contexts?.device?.free_storage).toBe(0)
  })

  it('should not modify the event if free_storage does not exist in device context', () => {
    const errorEventWithoutStorage = {
      contexts: {
        device: {},
      },
    } as ErrorEvent

    const result = getEventWithoutFreeStorageForIos(errorEventWithoutStorage)

    expect(result.contexts?.device?.free_storage).toBeUndefined()
  })

  it('should not modify the event if platform is android', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }))

    const errorEventWithStorage = {
      contexts: {
        device: {
          free_storage: 100,
        },
      },
    } as ErrorEvent

    const result = getEventWithoutFreeStorageForIos(errorEventWithStorage)

    expect(result.contexts?.device?.free_storage).toBe(100)
  })
})
