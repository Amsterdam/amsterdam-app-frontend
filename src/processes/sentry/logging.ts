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
import {getFilteredSentryData} from '@/processes/sentry/getFilteredSentryData'
import {
  BreadcrumbCategory,
  SentryErrorLogKey,
  type CaptureBreadcrumb,
  type SendErrorLog,
} from '@/processes/sentry/types'
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
    devLog('sendSentryErrorLog', errorTitle ?? logKey, filename, data)

    const extraData = logData ? getFilteredSentryData(logKey, data) : undefined

    withScope(scope => {
      scope.setContext('data', {filename, ...extraData})
      captureException(new Error(errorTitle ?? logKey))
    })
  }

type Meta = {arg?: {endpointName?: string; queryCacheKey?: string}} | undefined
type Payload = {originalStatus?: number | string} | undefined

export const sanitizeAction = (
  action: PayloadAction<Payload, string, Meta>,
) => {
  if (!action.meta?.arg?.queryCacheKey) {
    return action
  }

  return {
    ...action,
    meta: {
      ...action.meta,
      arg: {
        queryCacheKey: '___',
      },
    },
  }
}

/**
 * RTK middleware to catch API errors and other rejections
 */
export const sentryLoggerMiddleware: Middleware =
  () => next => (action: PayloadAction<Payload, string, Meta>) => {
    if (isRejectedWithValue(action)) {
      // @TODO: when we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting
      const consent = true

      let errorTitle = 'Rejected RTK action'
      const endpoint = action.meta?.arg?.endpointName
      const originalStatus = action.payload?.originalStatus

      if (endpoint) {
        errorTitle = `${originalStatus ?? 'Error'} for ${endpoint}`
      }

      const url = sanitizeUrl(
        (
          action.meta as unknown as {
            baseQueryMeta?: {request?: {url: string}}
          }
        ).baseQueryMeta?.request?.url ?? '',
      )

      if (!url.startsWith('http://localhost')) {
        const status = originalStatus ?? 'unknown'

        setTag('endpoint', endpoint)
        setTag('status', status)
        getSendSentryErrorLog(!!consent)(
          SentryErrorLogKey.sentryMiddleWareError,
          'processes/logging.ts',
          {
            ...sanitizeAction(action),
            endpoint,
            status,
            url,
          },
          errorTitle,
        )
        setTag('endpoint', undefined)
        setTag('status', undefined)
      }
    }

    return next(action)
  }
