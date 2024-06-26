import {type Breadcrumb, init, wrap} from '@sentry/react-native'
import {Platform} from 'react-native'
import type {ComponentType} from 'react'
import {AppFlavour, appFlavour, isDevApp} from '@/processes/development'
import {getSanitizedIosEvent} from '@/processes/sentry/utils'
import {sanitizeUrl} from '@/utils/sanitizeUrl'
import {BUILD_NUMBER, VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

const enableSentry = appFlavour !== AppFlavour.local

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
    beforeSend: getSanitizedIosEvent,
    beforeSendTransaction: getSanitizedIosEvent,
    // ignoreErrors: [], // can be used to filter out the occasional false positive
    tracesSampleRate: isDevApp ? 1 : 0.1,
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
