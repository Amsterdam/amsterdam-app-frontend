import {type PiwikProSdkType} from '@piwikpro/react-native-piwik-pro-sdk'
import {useContext, useMemo} from 'react'
import {navigationRef} from '@/app/navigation/navigationRef'
import {type RootStackParams} from '@/app/navigation/types'
import {devError, devLog} from '@/processes/development'
import {
  type PiwikCategory,
  type Piwik,
  PiwikDimension,
} from '@/processes/piwik/types'
import {addIdFromParamsToDimensions} from '@/processes/piwik/utils/addIdFromParamsToDimensions'
import {getTitleFromParams} from '@/processes/piwik/utils/getTitleFromParams'
import {postProcessDimensions} from '@/processes/piwik/utils/postProcessDimensions'
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

const piwikDefaultFn = () => devError('piwik not initialized')

// if Piwik is not initialized, we return dummy methods to make it fail silently
const DEFAULT_PIWIK_CONTEXT: Piwik = {
  ready: false,
  trackCustomEvent: piwikDefaultFn,
  trackOutlink: piwikDefaultFn,
  trackScreen: piwikDefaultFn,
  trackSearch: piwikDefaultFn,
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
  ready: true,
  trackCustomEvent: (
    name,
    action,
    dimensions,
    category = suggestedCategory,
    value = undefined,
  ) => {
    // TODO: remove this log when all analytics PBI's are done
    devLog('trackCustomEvent', {name, action, dimensions, category, value})
    trackCustomEvent(category, action, {
      path: routeName,
      customDimensions: postProcessDimensions(dimensions),
      value,
    }).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackCustomEvent, FILENAME, {
        category,
        action,
        name,
        path: routeName,
        value,
      })
    })
  },
  trackOutlink: (rawUrl, options) => {
    const url = sanitizeUrl(rawUrl)

    trackOutlink(url, {
      ...options,
      customDimensions: postProcessDimensions({
        ...options?.customDimensions,
        [PiwikDimension.routeName]: routeName,
      }),
    }).catch(() => {
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

    const customDimensions = addIdFromParamsToDimensions(
      options?.customDimensions,
      params,
    )

    trackScreen(name, {
      ...options,
      title: getTitleFromParams(params),
      customDimensions: postProcessDimensions(customDimensions),
    }).catch(() => {
      sendSentryErrorLog(SentryErrorLogKey.piwikTrackScreen, FILENAME, {
        path,
      })
    })
  },
  trackSearch: (keyword, options) => {
    trackSearch(keyword, {
      ...options,
      customDimensions: postProcessDimensions(options?.customDimensions),
    }).catch(() => {
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
