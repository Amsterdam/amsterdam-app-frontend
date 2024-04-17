import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {Platform} from 'react-native'
import type {SentryErrorLogKey} from '@/processes/sentry/types'
import type {ErrorEvent, TransactionEvent} from '@sentry/types'
import {sentryAllowList} from '@/processes/sentry/allowList'
import {DeviceRegistrationEndpointName} from '@/types/device'

/**
 * Get only whitelisted data for Sentry
 */
export const getAllowedData = (
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
 * Filter storage info and boot time from Sentry event for iOS only. This is a privacy requirement for NSPrivacyAccessedAPICategorySystemBootTime and NSPrivacyAccessedAPICategoryDiskSpace.
 */
export const getSanitizedIosEvent = <T extends ErrorEvent | TransactionEvent>(
  originalevent: T,
): T => {
  if (Platform.OS === 'android') {
    return originalevent
  }

  const event = {...originalevent}

  if (event.contexts?.device?.free_storage) {
    event.contexts.device.free_storage = undefined
  }

  if (event.contexts?.device?.boot_time) {
    event.contexts.device.boot_time = undefined
  }

  return event
}

/**
 * Used to prevent logging of expected API error responses.
 */
export const isExpectedError = (
  endpointName?: string,
  error?: FetchBaseQueryError,
) =>
  // unregisterDevice returns a 404 with body 'No record found', which means we tried to delete a device ID that does not exist anymore
  endpointName === DeviceRegistrationEndpointName.unregisterDevice &&
  error?.status === 404 &&
  error?.data === 'No record found'

const DISALLOWED_STATUS_CODES_FOR_LOGGING = [0, '0']

/**
 * Filter out status codes for which we do not want to log and undefined status codes
 */
export const isStatusCodeAllowedForLogging = (
  status: string | number | undefined,
) =>
  status !== undefined && !DISALLOWED_STATUS_CODES_FOR_LOGGING.includes(status)
