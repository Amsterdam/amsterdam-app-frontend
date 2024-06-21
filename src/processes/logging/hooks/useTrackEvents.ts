import {useContext, useMemo} from 'react'
import {navigationRef} from '@/app/navigation/navigationRef'
import {getTrackEvents} from '@/processes/logging/utils/getTrackEvents'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {useAppInsights} from '@/providers/appinsights.provider'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.provider'
import {getCurrentModuleSlugFromNavigationRootState} from '@/utils/getCurrentModuleSlugFromNavigationRootState'

export {
  PiwikAction,
  PiwikDimension,
  PiwikSessionDimension,
} from '@/processes/piwik/types'

export type Params = Record<string, unknown>

export const useTrackEvents = () => {
  const PiwikInstance = useContext(PiwikContext)
  const {sendSentryErrorLog} = useSentry()
  const route = navigationRef.isReady()
    ? navigationRef.getCurrentRoute()
    : undefined
  const suggestedCategory =
    getCurrentModuleSlugFromNavigationRootState() ?? 'general'

  const appInsights = useAppInsights()

  return useMemo(
    () =>
      getTrackEvents(
        sendSentryErrorLog,
        suggestedCategory,
        appInsights,
        PiwikInstance,
        route?.name,
        route?.params as Params,
      ),
    [
      PiwikInstance,
      sendSentryErrorLog,
      suggestedCategory,
      appInsights,
      route?.name,
      route?.params,
    ],
  )
}
