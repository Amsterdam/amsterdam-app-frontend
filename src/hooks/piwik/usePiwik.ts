/* eslint-disable @typescript-eslint/no-empty-function */
import {PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {useContext} from 'react'
import {useRoute} from '@/hooks/navigation/useRoute'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'
import {SendErrorLog} from '@/processes/sentry/types'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.provider'
import {Piwik} from '@/types/piwik'
import {sanitizeUrl} from '@/utils/sanitizeUrl'

export {PiwikAction, PiwikDimension, PiwikSessionDimension} from '@/types/piwik'

// if Piwik is not initialized, we return dummy methods to make it fail silently.
const defaultPiwikContext: Piwik = {
  trackCustomEvent: () => {},
  trackOutlink: () => {},
  trackScreen: () => {},
  trackSearch: () => {},
}

const FILE_NAME = 'usePiwik.ts'

// We can extend the default Piwik methods here, e.g. to automatically add the route name
const getPiwik = (
  {trackCustomEvent, trackOutlink, trackScreen, trackSearch}: PiwikProSdkType,
  sendSentryErrorLog: SendErrorLog,
  routeName?: string,
): Piwik => ({
  trackCustomEvent: (category, action, options) => {
    trackCustomEvent(category, action, {path: routeName, ...options}).catch(
      () => {
        sendSentryErrorLog(SentryErrorLogKey.piwikTrackCustomEvent, FILE_NAME, {
          category,
          action,
          name: options?.name,
        })
      },
    )
  },
  trackOutlink: (rawUrl, ...rest) => {
    const url = sanitizeUrl(rawUrl)

    trackOutlink(url, ...rest).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackOutlink, FILE_NAME, {
        url,
      })
    })
  },
  trackScreen: (path, ...rest) => {
    trackScreen(path, ...rest).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackScreen, FILE_NAME, {
        path,
      })
    })
  },
  trackSearch: (...args) => {
    trackSearch(...args).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackSearch, FILE_NAME)
    })
  },
})

const usePiwikBase = (routeName?: string) => {
  const PiwikInstance = useContext(PiwikContext)
  const {sendSentryErrorLog} = useSentry()

  if (!PiwikInstance) {
    return defaultPiwikContext
  }

  return getPiwik(PiwikInstance, sendSentryErrorLog, routeName)
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
