import {BUILD_NUMBER} from '@env'
import {NavigationContainerRef} from '@react-navigation/native'
import {Action, isRejectedWithValue} from '@reduxjs/toolkit'
import {
  addBreadcrumb,
  Breadcrumb,
  captureException,
  init,
  ReactNativeTracing,
  ReactNavigationInstrumentation,
  setTag,
  setUser,
  withScope,
} from '@sentry/react-native'
import {RefObject} from 'react'
import {Platform} from 'react-native'
// eslint-disable-next-line no-restricted-imports
import {getUniqueId, getVersion} from 'react-native-device-info'
import type {Middleware} from '@reduxjs/toolkit'
import {RootStackParams} from '@/app/navigation/types'
import {Environment} from '@/environment'
import {AppFlavour, appFlavour, devLog, isDevApp} from '@/processes/development'
import {
  BreadcrumbCategory,
  CaptureBreadcrumb,
  SendErrorLog,
  SentryLogKey,
  sentryWhitelist,
} from '@/types/sentry'

const routingInstrumentation = new ReactNavigationInstrumentation()

/**
 * To be used in the onready of the NavigationContainer: register the navigation with Sentry
 */
export const registerNavigationContainer = (
  ref: RefObject<NavigationContainerRef<RootStackParams>>,
) => {
  try {
    routingInstrumentation.registerNavigationContainer(ref)
  } catch (e) {
    devLog(e)
  }
}

/**
 * Remove query string from URL as it may contain user data
 */
const sanitizeUrl = (url: string) => (url ? url.split('?')[0] : '')

/**
 * The main initialization of Sentry
 */
export const initSentry = () => {
  // We do not log errors when running the app locally, but may want to in the future
  if (appFlavour === AppFlavour.local) {
    return
  }

  const version = getVersion()

  init({
    dsn: 'https://39ba20d819034bc2a98af077acec8bec@o1315195.ingest.sentry.io/6567463',
    environment: appFlavour,
    dist: BUILD_NUMBER,
    release: `${Platform.OS}@${version}.${BUILD_NUMBER ?? '0'}`,
    beforeBreadcrumb: (breadcrumb: Breadcrumb) => {
      // remove query params from request URLS as they may contain personal data
      if (breadcrumb.category === 'xhr') {
        return {
          ...breadcrumb,
          data: {
            ...breadcrumb.data,
            url: sanitizeUrl(breadcrumb.data?.url as string),
          },
        }
      }

      return breadcrumb
    },
    // beforeSend: event => event, // process the event before sending it to Sentry
    // ignoreErrors: [], // can be used to filter out the occasional false positive
    tracesSampleRate: isDevApp ? 1 : 0.1,
    integrations: [
      new ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
  })
}

/**
 * Set/update the back end enviroment so in the case of a development app, we know which one was used
 */
export const setSentryBackEndEnvironment = (environment: Environment): void => {
  setTag('backEndEnvironment', environment)
}

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
  (message, filename, data) => {
    devLog('sendSentryErrorLog', message, filename, data)

    const extraData = logData ? sentryWhitelist[message] : undefined

    withScope(scope => {
      scope.setContext('data', {filename, ...extraData})
      captureException(new Error(message))
    })
  }

/**
 * Set the user ID to be sent to Sentry; if enabled is false we do not send anything (user ID will be a unique hash)
 */
export const setSentryUserData = (enabled: boolean) => {
  // we explicitly cast user ID to string, since non-string type will cause issues
  setUser(enabled ? {id: getUniqueId()} : null)
}

/**
 * RTK middleware to catch API errors and other rejections
 */
export const sentryLoggerMiddleware: Middleware =
  () => next => (action: Action) => {
    if (isRejectedWithValue(action)) {
      // @TODO: when we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting
      const consent = true
      // let error = 'Rejected RTK action'
      let dataWithDangerousSentryScrubbingOverride

      // @TODO: SentryWhiteList fix
      // if ((action.meta.arg as {endpointName: string})?.endpointName) {
      //   error = `${
      //     (action.payload as {originalStatus: string})?.originalStatus ??
      //     'Error'
      //   } for ${(action.meta.arg as {endpointName: string}).endpointName}`

      //   // temporarily log additional data for getModulesForApp
      //   if (
      //     (action.meta.arg as {endpointName: string}).endpointName ===
      //     'getModulesForApp'
      //   ) {
      //     dataWithDangerousSentryScrubbingOverride = (
      //       action.meta as unknown as {baseQueryMeta: unknown}
      //     ).baseQueryMeta
      //   }
      // }

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
          SentryLogKey.sentryMiddleWareError,
          'sentry.ts',
          {
            ...action,
            endpoint,
            status,
            url,

            dataWithDangerousSentryScrubbingOverride,
          },
        )
        setTag('endpoint', undefined)
        setTag('status', undefined)
      }
    }

    return next(action)
  }
