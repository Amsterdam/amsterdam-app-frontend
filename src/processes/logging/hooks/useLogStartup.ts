import {useCallback} from 'react'
import {getStartupTimeSync} from 'react-native-device-info'
import {EventLogKey} from '@/processes/logging/types'
import {useAppInsights} from '@/providers/appinsights.provider'

export const useLogStartup = () => {
  const appInsights = useAppInsights()

  return useCallback(() => {
    if (!__DEV__) {
      appInsights.trackMetric({
        name: EventLogKey.fullStartup,
        average: new Date().getTime() - Number(getStartupTimeSync()),
      })
    }
  }, [appInsights])
}
