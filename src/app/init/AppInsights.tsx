import {useEffect} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAddTelemetryInitializer} from '@/processes/logging/hooks/useAddTelemetryInitializer'
import {EventLogKey} from '@/processes/logging/types'
import {
  getApplicationInsightsConfig,
  useAppInsights,
} from '@/providers/appinsights.provider'
import {
  selectIsConnected,
  selectIsInternetReachable,
} from '@/store/slices/internetConnection'

export const AppInsights = () => {
  const environment = useSelector(state => state.environment.environment)
  const appInsights = useAppInsights()
  const isConnected = useSelector(selectIsConnected)
  const isInternetReachable = useSelector(selectIsInternetReachable)

  useAddTelemetryInitializer()

  useEffect(() => {
    if (isConnected !== null || isInternetReachable !== null) {
      appInsights.trackEvent({
        name: EventLogKey.internetConnection,
        properties: {
          isConnected,
          isInternetReachable,
        },
      })
    }
  }, [appInsights, isConnected, isInternetReachable])

  useEffect(() => {
    appInsights.updateCfg(getApplicationInsightsConfig(environment).config)
  }, [appInsights, environment])

  return null
}
