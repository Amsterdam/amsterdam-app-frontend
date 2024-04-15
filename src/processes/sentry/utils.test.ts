import type {ErrorEvent} from '@sentry/types'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {getSanitizedIosEvent, getAllowedData} from '@/processes/sentry/utils'

describe('Sentry log whitelist', () => {
  it('With valid logkey', () =>
    expect(
      getAllowedData(SentryErrorLogKey.pickingImageFailed, {
        error: 'Not found',
        code: '404',
        viaCamera: true,
      }),
    ).toStrictEqual({error: 'Not found', code: '404', viaCamera: true}))

  it('Filtering data', () =>
    expect(
      getAllowedData(SentryErrorLogKey.coordinates, {
        code: '404',
        message: 'Not found',
        error: 'Not found',
      }),
    ).toStrictEqual({error: 'Not found'}))

  it('No data object', () =>
    expect(getAllowedData(SentryErrorLogKey.coordinates)).toStrictEqual(
      undefined,
    ))

  it('Empty data object', () =>
    expect(getAllowedData(SentryErrorLogKey.coordinates, {})).toStrictEqual(
      undefined,
    ))

  it('Empty sentry whitelist', () =>
    expect(getAllowedData(SentryErrorLogKey.openMailUrl, {})).toStrictEqual(
      undefined,
    ))
})

describe('getSanitizedIosEvent', () => {
  it('should set free_storage to undefined if it exists in device context', () => {
    const errorEventWithStorage = {
      contexts: {
        device: {
          free_storage: 100,
        },
      },
    } as ErrorEvent

    const result = getSanitizedIosEvent(errorEventWithStorage)

    expect(result.contexts?.device?.free_storage).toBeUndefined()
  })

  it('should set boot_time to undefined if it exists in device context', () => {
    const errorEventWithBootTime = {
      contexts: {
        device: {
          boot_time: 'some_timestamp',
        },
      },
    } as ErrorEvent

    const result = getSanitizedIosEvent(errorEventWithBootTime)

    expect(result.contexts?.device?.boot_time).toBeUndefined()
  })

  it('should not modify events when contexts, device, free_storage or boot_time properties is omitted', () => {
    const errorEvent1 = {} as ErrorEvent
    const errorEvent2 = {contexts: {}} as ErrorEvent
    const errorEvent3 = {contexts: {device: {}}} as ErrorEvent

    const result1 = getSanitizedIosEvent(errorEvent1)
    const result2 = getSanitizedIosEvent(errorEvent2)
    const result3 = getSanitizedIosEvent(errorEvent3)

    expect(result1).toEqual(errorEvent1)
    expect(result2).toEqual(errorEvent2)
    expect(result3).toEqual(errorEvent3)
  })

  it('should not modify the event if platform is android', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }))

    const errorEvent = {
      contexts: {
        device: {
          free_storage: 100,
          boot_time: 'some_timestamp',
        },
      },
    } as ErrorEvent

    const result = getSanitizedIosEvent(errorEvent)

    expect(result.contexts?.device?.free_storage).toBe(100)
    expect(result.contexts?.device?.boot_time).toBe('some_timestamp')
  })
})
