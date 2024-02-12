/* eslint-disable @typescript-eslint/no-empty-function */
import {type PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {useContext, useMemo} from 'react'
import {navigationRef} from '@/app/navigation/navigationRef'
import {RootStackParams} from '@/app/navigation/types'
import {PiwikCategory, type Piwik} from '@/processes/piwik/types'
import {
  addIdFromParamsToCustomDimensions,
  getOptionsWithDefaultDimensions,
  getTitleFromParams,
} from '@/processes/piwik/utils'
import {SentryErrorLogKey, useSentry} from '@/processes/sentry/hooks/useSentry'
import {type SendErrorLog} from '@/processes/sentry/types'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.provider'
import {getCurrentModuleSlugFromNavigationRootState} from '@/utils/getCurrentModuleSlugFromNavigationRootState'
import {sanitizeUrl} from '@/utils/sanitizeUrl'

export {
  PiwikAction,
  PiwikDimension,
  PiwikSessionDimension,
} from '@/processes/piwik/types'

// if Piwik is not initialized, we return dummy methods to make it fail silently
const DEFAULT_PIWIK_CONTEXT: Piwik = {
  suggestedCategory: 'general',
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
  suggestedCategory: PiwikCategory,
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
      ...options,
      title: getTitleFromParams(params),
      customDimensions: addIdFromParamsToCustomDimensions(
        options?.customDimensions,
        params,
      ),
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
  suggestedCategory,
})

export const usePiwik = () => {
  const PiwikInstance = useContext(PiwikContext)
  const {sendSentryErrorLog} = useSentry()
  const route = navigationRef.isReady()
    ? navigationRef.getCurrentRoute()
    : undefined
  const suggestedCategory =
    getCurrentModuleSlugFromNavigationRootState() ?? 'general'

  return useMemo(() => {
    if (!PiwikInstance) {
      return DEFAULT_PIWIK_CONTEXT
    }

    return getPiwik(
      PiwikInstance,
      sendSentryErrorLog,
      suggestedCategory,
      route?.name,
      route?.params as Params,
    )
  }, [
    PiwikInstance,
    sendSentryErrorLog,
    suggestedCategory,
    route?.name,
    route?.params,
  ])
}
