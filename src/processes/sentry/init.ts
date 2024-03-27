import {NavigationContainerRef} from '@react-navigation/native'
import {
  type Breadcrumb,
  init,
  ReactNativeTracing,
  ReactNavigationInstrumentation,
  setTag,
  setUser,
  wrap,
} from '@sentry/react-native'
import {Platform} from 'react-native'
import type {RootStackParams} from '@/app/navigation/types'
import type {Environment} from '@/environment'
import type {ComponentType, RefObject} from 'react'
import {AppFlavour, appFlavour, devLog, isDevApp} from '@/processes/development'
import {getEventWithoutFreeStorageForIos} from '@/processes/sentry/utils'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
import {sanitizeUrl} from '@/utils/sanitizeUrl'
import {BUILD_NUMBER, VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

const enableSentry = appFlavour !== AppFlavour.local

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
 * The main initialization of Sentry
 */
export const initSentry = () => {
  // We do not log errors when running the app locally, but may want to in the future
  if (!enableSentry) {
    return
  }

  init({
    dsn: 'https://39ba20d819034bc2a98af077acec8bec@o1315195.ingest.sentry.io/6567463',
    environment: appFlavour,
    dist: BUILD_NUMBER,
    release: `${Platform.OS}@${VERSION_NUMBER_WITH_BUILD}`,
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
    beforeSend: getEventWithoutFreeStorageForIos,
    beforeSendTransaction: getEventWithoutFreeStorageForIos,
    // ignoreErrors: [], // can be used to filter out the occasional false positive
    tracesSampleRate: isDevApp ? 1 : 0.1,
    integrations: [
      new ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
  })
}

export const sentryWrap = <P extends Record<string, unknown>>(
  RootComponent: ComponentType<P>,
): ComponentType<P> => {
  if (!enableSentry) {
    return RootComponent
  }

  return wrap(RootComponent, {
    touchEventBoundaryProps: {labelName: 'testID'},
  })
}

/**
 * Set/update the back end enviroment so in the case of a development app, we know which one was used
 */
export const setSentryBackEndEnvironment = (environment: Environment): void => {
  setTag('backEndEnvironment', environment)
}

/**
 * Set the user ID to be sent to Sentry; if enabled is false we do not send anything (user ID will be a unique hash)
 */
export const setSentryUserData = (enabled: boolean) => {
  // we explicitly cast user ID to string, since non-string type will cause issues
  setUser(enabled ? {id: SHA256EncryptedDeviceId} : null)
}
