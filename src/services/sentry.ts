import {BUILD_NUMBER} from '@env'
import {NavigationContainerRef} from '@react-navigation/native'
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
import {RootStackParamList} from '../app/navigation'
import {Environment} from '../environment'
import {BreadcrumbCategory, CaptureBreadcrumb, SendErrorLog} from '../types'
import {appFlavour, devLog, isDevApp} from './development'

const routingInstrumentation = new ReactNavigationInstrumentation()

/**
 * To be used in the onready of the NavigationContainer: register the navigation with Sentry
 */
export const registerNavigationContainer = (
  ref: RefObject<NavigationContainerRef<RootStackParamList>>,
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
const sanitizeUrl = (url: string) => {
  if (!url) {
    return
  }
  return url.split('?')[0]
}

/**
 * The main initialization of Sentry
 */
export const initSentry = () => {
  init({
    dsn: 'https://7a6ad9f75fab4c509da16d13bbab4271@o1279066.ingest.sentry.io/6479388',
    environment: appFlavour,
    dist: BUILD_NUMBER,
    release: `${Platform.OS}@${version}.${BUILD_NUMBER ?? '0'}`,
    beforeBreadcrumb: (breadcrumb: Breadcrumb) => {
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
  return Promise.resolve()
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
    const extraData = logData ? data : undefined
    Object.entries({filename, ...extraData}).forEach(([key, value]) => {
      setExtra(key, value)
    })
    captureException(new Error(message))
  }

/**
 * Set the user ID to be sent to Sentry; if enabled is false we do not send anything
 */
export const setSentryUserData = (enabled: boolean) => {
  // we explicitly cast user ID to string, since non-string type will cause issues
  setUser(enabled ? {id: getUniqueId().toString()} : null)
}
