/* eslint-disable @typescript-eslint/no-empty-function */
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {
  CommonEventOptions,
  CustomDimensions,
  TrackCustomEventOptions,
} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {useContext, useMemo} from 'react'
import {useRoute} from '@/hooks/navigation/useRoute'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'
import {SendErrorLog} from '@/processes/sentry/types'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.provider'
import {Piwik, PiwikSessionDimension} from '@/types/piwik'
import {sanitizeUrl} from '@/utils/sanitizeUrl'
import {VERSION_NUMBER, VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

export {PiwikAction, PiwikDimension, PiwikSessionDimension} from '@/types/piwik'

// if Piwik is not initialized, we return dummy methods to make it fail silently
const DEFAULT_PIWIK_CONTEXT: Piwik = {
  trackCustomEvent: () => {},
  trackOutlink: () => {},
  trackScreen: () => {},
  trackSearch: () => {},
}

const FILENAME = 'usePiwik.ts'

const DEFAULT_DIMENSIONS: CustomDimensions = {
  [PiwikSessionDimension.appVersion]: VERSION_NUMBER,
  [PiwikSessionDimension.appVersionWithBuild]: VERSION_NUMBER_WITH_BUILD,
}

/** Add the default dimensions to any options object */
const getOptionsWithDefaultDimensions = <
  T extends TrackCustomEventOptions | CommonEventOptions,
>(
  options?: T,
) =>
  ({
    ...options,
    customDimensions: {...options?.customDimensions, ...DEFAULT_DIMENSIONS},
  }) as T

// We can extend the default Piwik methods here, e.g. to automatically add the route name
const getPiwik = (
  {trackCustomEvent, trackOutlink, trackScreen, trackSearch}: PiwikProSdkType,
  sendSentryErrorLog: SendErrorLog,
  routeName?: string,
): Piwik => ({
  trackCustomEvent: (category, action, options) => {
    const opts = getOptionsWithDefaultDimensions(options)

    trackCustomEvent(category, action, {path: routeName, ...opts}).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackCustomEvent, FILENAME, {
        category,
        action,
        name: opts?.name,
      })
    })
  },
  trackOutlink: (rawUrl, options) => {
    const opts = getOptionsWithDefaultDimensions(options)
    const url = sanitizeUrl(rawUrl)

    trackOutlink(url, opts).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackOutlink, FILENAME, {
        url,
      })
    })
  },
  trackScreen: (path, options) => {
    const opts = getOptionsWithDefaultDimensions(options)

    trackScreen(path, opts).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackScreen, FILENAME, {
        path,
      })
    })
  },
  trackSearch: (keyword, options) => {
    const opts = getOptionsWithDefaultDimensions(options)

    trackSearch(keyword, opts).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackSearch, FILENAME)
    })
  },
})

const usePiwikBase = (routeName?: string) => {
  const PiwikInstance = useContext(PiwikContext)
  const {sendSentryErrorLog} = useSentry()

  return useMemo(() => {
    if (!PiwikInstance) {
      return DEFAULT_PIWIK_CONTEXT
    }

    return getPiwik(PiwikInstance, sendSentryErrorLog, routeName)
  }, [PiwikInstance, routeName, sendSentryErrorLog])
}

/**
 * Returns Piwik logging methods. This hook can only be used in components inside the navigation container, since it relies on the navigation to automatically add the route name to custom events.
 */
export const usePiwik = (): Piwik => {
  const {name} = useRoute()

  return usePiwikBase(name)
}

/**
 * Use this for Piwik logging in components outside the navigation container. The usePiwik hook automatically adds the route name to custom events, but this causes an error when used outside the navigation container. This hook omits that behaviour and can be used safely anywhere.
 */
export const usePiwikOutsideNavigation = (): Piwik => usePiwikBase()
