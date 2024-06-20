import {
  isRejectedWithValue,
  type Middleware,
  type PayloadAction,
} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {addBreadcrumb, captureException, withScope} from '@sentry/react-native'
import {devLog} from '@/processes/development'
import {
  BreadcrumbCategory,
  type CaptureBreadcrumb,
  type SendErrorLog,
} from '@/processes/sentry/types'
import {
  getAllowedData,
  isExpectedError,
  isStatusCodeAllowedForLogging,
} from '@/processes/sentry/utils'
import {appInsights} from '@/providers/appinsights.provider'

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

export const logRequestFailed = (
  action: Pick<PayloadAction<Payload, string, Meta>, 'meta' | 'payload'>,
) => {
  const endpoint = action.meta?.arg?.endpointName
  const originalStatus = action.payload?.originalStatus
  const status = action.payload?.status

  if (
    !isStatusCodeAllowedForLogging(originalStatus ?? status) ||
    isExpectedError(endpoint, action.payload as FetchBaseQueryError)
  ) {
    return
  }

  let title = 'Rejected RTK action'

  if (endpoint) {
    title = `${originalStatus ?? status ?? 'Error'} for ${endpoint}`
  }

  const errorTitle = `All request retries failed: ${title}`

  const url = action.meta?.baseQueryMeta?.request?.url

  if (url && !url.startsWith('http://localhost')) {
    appInsights.trackException({
      exception: new Error(errorTitle),
      properties: {
        endpoint,
        originalStatus,
        status,
        error: action.payload?.error,
        url,
      },
    })
  }
}

/**
 * RTK middleware to catch API errors and other rejections
 */
export const loggerMiddleware: Middleware =
  () => next => (action: PayloadAction<Payload, string, Meta>) => {
    if (isRejectedWithValue(action)) {
      logRequestFailed(action)
    }

    return next(action)
  }
