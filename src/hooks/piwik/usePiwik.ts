/* eslint-disable @typescript-eslint/no-empty-function */
import {type PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {useContext, useMemo} from 'react'
import {navigationRef} from '@/app/navigation/navigationRef'
import {RootStackParams} from '@/app/navigation/types'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'
import {type SendErrorLog} from '@/processes/sentry/types'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.provider'
import {type Piwik} from '@/types/piwik'
import {
  getOptionsWithDefaultDimensions,
  getTitleFromParams,
} from '@/utils/piwik'
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

type Params = Record<string, unknown>

// We can extend the default Piwik methods here, e.g. to automatically add the route name
const getPiwik = (
  {trackCustomEvent, trackOutlink, trackScreen, trackSearch}: PiwikProSdkType,
  sendSentryErrorLog: SendErrorLog,
  routeName?: keyof RootStackParams,
  params?: Params,
): Piwik => ({
  trackCustomEvent: (category, action, options) => {
    trackCustomEvent(
      category,
      action,
      getOptionsWithDefaultDimensions({
        path: routeName,
        ...options,
      }),
    ).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackCustomEvent, FILENAME, {
        category,
        action,
        name: options?.name,
      })
    })
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
    const name = path ?? routeName

    if (!name) {
      return
    }

    trackScreen(name, {
      title: getTitleFromParams(params),
      ...options,
    }).catch(() => {
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

export const usePiwik = () => {
  const PiwikInstance = useContext(PiwikContext)
  const {sendSentryErrorLog} = useSentry()
  const route = navigationRef.isReady()
    ? navigationRef.getCurrentRoute()
    : undefined

  return useMemo(() => {
    if (!PiwikInstance) {
      return DEFAULT_PIWIK_CONTEXT
    }

    return getPiwik(
      PiwikInstance,
      sendSentryErrorLog,
      route?.name,
      route?.params as Params,
    )
  }, [PiwikInstance, route?.name, route?.params, sendSentryErrorLog])
}
