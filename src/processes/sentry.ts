import {BUILD_NUMBER} from '@env'
import {NavigationContainerRef} from '@react-navigation/native'
import {isRejectedWithValue} from '@reduxjs/toolkit'
import {
  init,
  ReactNavigationInstrumentation,
  ReactNativeTracing,
  addBreadcrumb,
  setTag,
  captureException,
  setExtra,
  setUser,
  Breadcrumb,
} from '@sentry/react-native'
import {RefObject} from 'react'
import {Platform} from 'react-native'
import {getUniqueId} from 'react-native-device-info'
import {version} from '../../package.json'
import type {Middleware} from '@reduxjs/toolkit'
import {RootStackParams} from '@/app/navigation'
import {Environment} from '@/environment'
import {AppFlavour, appFlavour, devLog, isDevApp} from '@/processes'
import {BreadcrumbCategory, CaptureBreadcrumb, SendErrorLog} from '@/types'
import {stringifyIfObject} from '@/utils'

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
            url: sanitizeUrl(breadcrumb.data?.url),
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
    const extraData = logData ? data : undefined
    Object.entries({filename, ...extraData}).forEach(([key, value]) => {
      setExtra(key, stringifyIfObject(value))
    })
    captureException(new Error(message))
  }

/**
 * Set the user ID to be sent to Sentry; if enabled is false we do not send anything (user ID will be a unique hash)
 */
export const setSentryUserData = (enabled: boolean) => {
  // we explicitly cast user ID to string, since non-string type will cause issues
  setUser(enabled ? {id: getUniqueId().toString()} : null)
}

/**
 * RTK middleware to catch API errors and other rejections
 */
export const sentryLoggerMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    // @TODO: when we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting
    const consent = true
    getSendSentryErrorLog(!!consent)(
      action.meta.arg?.endpointName
        ? `${action.payload?.originalStatus ?? 'Error'} for ${
            action.meta.arg.endpointName
          }`
        : 'Rejected RTK action',
      'sentry.ts',
      {...action, url: sanitizeUrl(action.meta.baseQueryMeta?.request?.url)},
    )
  }
  return next(action)
}
