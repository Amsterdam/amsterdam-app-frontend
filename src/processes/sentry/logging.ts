import {Action, isRejectedWithValue} from '@reduxjs/toolkit'
import {
  addBreadcrumb,
  captureException,
  setTag,
  withScope,
} from '@sentry/react-native'
import type {Middleware} from '@reduxjs/toolkit'
import {devLog} from '@/processes/development'
import {
  BreadcrumbCategory,
  CaptureBreadcrumb,
  SendErrorLog,
  SentryErrorLogKey,
} from '@/processes/sentry/types'
import {getFilteredSentryData, sanitizeUrl} from '@/processes/sentry/utils'

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

/**
 * RTK middleware to catch API errors and other rejections
 */
export const sentryLoggerMiddleware: Middleware =
  () => next => (action: Action) => {
    if (isRejectedWithValue(action)) {
      // @TODO: when we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting
      const consent = true
      let errorTitle = 'Rejected RTK action'

      // @TODO: SentryWhiteList fix
      if ((action.meta.arg as {endpointName: string})?.endpointName) {
        errorTitle = `${
          (action.payload as {originalStatus: string})?.originalStatus ??
          'Error'
        } for ${(action.meta.arg as {endpointName: string}).endpointName}`
      }

      const url = sanitizeUrl(
        (
          action.meta as unknown as {
            baseQueryMeta?: {request?: {url: string}}
          }
        ).baseQueryMeta?.request?.url ?? '',
      )

      if (!url.startsWith('http://localhost')) {
        const endpoint = (action.meta.arg as {endpointName: string})
          .endpointName
        const status =
          (action.payload as {originalStatus: string})?.originalStatus ??
          'unknown'

        setTag('endpoint', endpoint)
        setTag('status', status)
        getSendSentryErrorLog(!!consent)(
          SentryErrorLogKey.sentryMiddleWareError,
          'sentry.ts',
          {
            ...action,
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
