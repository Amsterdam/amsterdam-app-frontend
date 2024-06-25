import {useCallback} from 'react'
import {Platform} from 'react-native'
import {getStartupTimeSync} from 'react-native-device-info'
import {EventLogKey} from '@/processes/logging/types'
import {
  APP_START_MAX_DURATION_IOS,
  useAppInsights,
} from '@/providers/appinsights.provider'

export const useLogStartup = () => {
  const {appInsights} = useAppInsights()

  return useCallback(() => {
    if (
      !__DEV__ &&
      (Platform.OS !== 'ios' ||
        new Date().getTime() - Number(getStartupTimeSync()) <
          APP_START_MAX_DURATION_IOS)
    ) {
      appInsights.trackMetric({
        name: EventLogKey.fullStartup,
        average: new Date().getTime() - Number(getStartupTimeSync()),
      })
    }
  }, [appInsights])
}
