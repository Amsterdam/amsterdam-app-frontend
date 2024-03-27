import {Platform} from 'react-native'
import type {SentryErrorLogKey} from '@/processes/sentry/types'
import type {ErrorEvent, TransactionEvent} from '@sentry/types'
import {sentryAllowList} from '@/processes/sentry/allowList'

/**
 * Get only whitelisted data for Sentry
 */
export const getFilteredSentryData = (
  logKey: SentryErrorLogKey,
  data?: Record<string, unknown>,
) => {
  if (!data || Object.keys(data).length === 0) {
    return undefined
  }

  return (sentryAllowList[logKey] as readonly string[])?.reduce(
    (obj, key) => ({...obj, [key]: data[key]}),
    {},
  )
}

/**
 * Filter storage info from Sentry event for iOS (privacy requirement, NSPrivacyAccessedAPICategoryDiskSpace)
 */
export const getEventWithoutFreeStorageForIos = <
  T extends ErrorEvent | TransactionEvent,
>(
  originalevent: T,
): T => {
  if (Platform.OS === 'android') {
    return originalevent
  }

  const event = {...originalevent}

  if (event.contexts?.device?.free_storage) {
    event.contexts.device.free_storage = 0
  }

  return event
}
