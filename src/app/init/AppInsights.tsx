import NetInfo from '@react-native-community/netinfo'
import {useState, useEffect} from 'react'
import {useAddTelemetryInitializer} from '@/processes/logging/hooks/useAddTelemetryInitializer'
import {EventLogKey} from '@/processes/logging/types'
import {useAppInsights} from '@/providers/appinsights.provider'

export const AppInsights = () => {
  const appInsights = useAppInsights()
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isInternetReachable, setIsInternetReachable] = useState<
    boolean | null
  >(null)

  useAddTelemetryInitializer()

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

  return null
}
