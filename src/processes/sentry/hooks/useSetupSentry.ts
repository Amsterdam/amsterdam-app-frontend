import NetInfo from '@react-native-community/netinfo'
import {useEffect, useState} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAppInsights} from '@/processes/logging/hooks/useAppInsights'
import {EventLogKey} from '@/processes/logging/types'
import {
  setSentryBackEndEnvironment,
  setSentryUserData,
} from '@/processes/sentry/init'
import {getApplicationInsightsConfig} from '@/providers/appinsights.provider'

/**
 * Initialize Sentry and related listeners and side effects
 */
export const useSetupSentry = () => {
  const environment = useSelector(state => state.environment.environment)
  const {appInsights} = useAppInsights()

  // TODO When we implement the consent feature (user data usage), we can get this from the Redux state and disable Sentry features depending on that setting.
  const consent = true

  useEffect(() => {
    setSentryUserData(consent)
  }, [consent])

  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null)

  useEffect(
    () =>
      NetInfo.addEventListener(
        ({
          isConnected: newIsConnected,
          isInternetReachable: newIsInternetReachable,
        }) => {
          setIsConnected(newIsConnected)
          setIsInternetReachable(newIsInternetReachable)
        },
      ),
    [appInsights],
  )
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
    setSentryBackEndEnvironment(environment)
    appInsights.updateCfg(getApplicationInsightsConfig(environment).config)
  }, [appInsights, environment])
}
