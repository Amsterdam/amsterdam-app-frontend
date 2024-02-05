/* eslint-disable @typescript-eslint/no-empty-function */
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {useContext, useMemo} from 'react'
import {useRoute} from '@/hooks/navigation/useRoute'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'
import {SendErrorLog} from '@/processes/sentry/types'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.provider'
import {Piwik} from '@/types/piwik'
import {getOptionsWithDefaultDimensions} from '@/utils/piwik'
import {sanitizeUrl} from '@/utils/sanitizeUrl'

export {PiwikAction, PiwikDimension, PiwikSessionDimension} from '@/types/piwik'

// if Piwik is not initialized, we return dummy methods to make it fail silently
const DEFAULT_PIWIK_CONTEXT: Piwik = {
  trackCustomEvent: () => {},
  trackOutlink: () => {},
  trackScreen: () => {},
  trackSearch: () => {},
}

const FILENAME = 'usePiwik.ts'

// We can extend the default Piwik methods here, e.g. to automatically add the route name
const getPiwik = (
  {trackCustomEvent, trackOutlink, trackScreen, trackSearch}: PiwikProSdkType,
  sendSentryErrorLog: SendErrorLog,
  routeName?: string,
): Piwik => ({
  trackCustomEvent: (category, action, options) => {
    const optionsWithDefaultDimensions = getOptionsWithDefaultDimensions({
      path: routeName,
      ...options,
    })

    trackCustomEvent(category, action, optionsWithDefaultDimensions).catch(
      () => {
        sendSentryErrorLog(SentryErrorLogKey.piwikTrackCustomEvent, FILENAME, {
          category,
          action,
          name: optionsWithDefaultDimensions?.name,
        })
      },
    )
  },
  trackOutlink: (rawUrl, options) => {
    const url = sanitizeUrl(rawUrl)

    trackOutlink(url, getOptionsWithDefaultDimensions(options)).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackOutlink, FILENAME, {
        url,
      })
    })
  },
  trackScreen: (path, options) => {
    trackScreen(path, getOptionsWithDefaultDimensions(options)).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackScreen, FILENAME, {
        path,
      })
    })
  },
  trackSearch: (keyword, options) => {
    trackSearch(keyword, getOptionsWithDefaultDimensions(options)).catch(() => {
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
