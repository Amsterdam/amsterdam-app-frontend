import {
  isRejectedWithValue,
  type Middleware,
  type PayloadAction,
} from '@reduxjs/toolkit'
import {
  addBreadcrumb,
  captureException,
  setTag,
  withScope,
} from '@sentry/react-native'
import {devLog} from '@/processes/development'
import {
  BreadcrumbCategory,
  SentryErrorLogKey,
  type CaptureBreadcrumb,
  type SendErrorLog,
} from '@/processes/sentry/types'
import {getAllowedData} from '@/processes/sentry/utils'
import {sanitizeUrl} from '@/utils/sanitizeUrl'

/**
 * Get the function to: add a breadcrumb to the stack trace in the error report
 */
export const getCaptureSentryBreadcrumb =
  (logData: boolean): CaptureBreadcrumb =>
  (message, data, category = BreadcrumbCategory.default): void => {
    addBreadcrumb({
      message,
      category,
      data: logData ? data : undefined,
    })
  }

/**
 * Get the function to: manually send an error to Sentry; to be used in catch statements and other error handling
 */
export const getSendSentryErrorLog =
  (logData: boolean): SendErrorLog =>
  (logKey, filename, data, errorTitle) => {
    const extraData = logData ? getAllowedData(logKey, data) : undefined

    devLog('sendSentryErrorLog', errorTitle ?? logKey, filename, extraData)

    withScope(scope => {
      scope.setContext('data', {filename, ...extraData})
      captureException(new Error(errorTitle ?? logKey))
    })
  }

export type Meta =
  | {arg?: {endpointName?: string}; baseQueryMeta?: {request?: {url: string}}}
  | undefined

type Payload =
  | {error: unknown; originalStatus?: number | string; status?: string}
  | undefined

const disallowedStatusCodesForLogging = [0, '0']

const isStatusCodeDisallowedForLogging = (
  status: string | number | undefined,
) => disallowedStatusCodesForLogging.includes(status ?? '')

export const sentryLogRequestFailed = (
  action: Pick<PayloadAction<Payload, string, Meta>, 'meta' | 'payload'>,
  singleRequest = false,
) => {
  // @TODO: when we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting
  const consent = true

  let title = 'Rejected RTK action'
  const endpoint = action.meta?.arg?.endpointName
  const originalStatus = action.payload?.originalStatus
  const status = action.payload?.status

  if (isStatusCodeDisallowedForLogging(originalStatus ?? status)) {
    return
  }

  if (endpoint) {
    title = `${originalStatus ?? status ?? 'Error'} for ${endpoint}`
  }

  const errorTitle = `${singleRequest ? 'Request failed' : 'All request retries failed'}: ${title}`

  const url = sanitizeUrl(action.meta?.baseQueryMeta?.request?.url ?? '')

  if (!url.startsWith('http://localhost')) {
    setTag('endpoint', endpoint)
    setTag('originalStatus', originalStatus)
    setTag('status', status)
    getSendSentryErrorLog(!!consent)(
      SentryErrorLogKey.sentryMiddleWareError,
      'processes/logging.ts',
      {
        endpoint,
        error: action.payload?.error,
        originalStatus,
        status: action.payload?.status,
        url,
      },
      errorTitle,
    )
    setTag('endpoint', undefined)
    setTag('originalStatus', undefined)
  }
}

/**
 * RTK middleware to catch API errors and other rejections
 */
export const sentryLoggerMiddleware: Middleware =
  () => next => (action: PayloadAction<Payload, string, Meta>) => {
    if (isRejectedWithValue(action)) {
      sentryLogRequestFailed(action)
    }

    return next(action)
  }
