import {useCallback, useEffect} from 'react'
import {useLogAccessibilityAnalytics} from '@/processes/piwik/hooks/useLogAccessibilityAnalytics'
import {useLogDeviceInfoAnalytics} from '@/processes/piwik/hooks/useLogDeviceInfoAnalytics'
import {useLogPermissionAnalytics} from '@/processes/piwik/hooks/useLogPermissionAnalytics'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {PiwikAction} from '@/processes/piwik/types'

export {PiwikAction} from '@/processes/piwik/types'

/**
 * Any session related data can be logged here, this hook will return a logging function and execute that function once on app start up..
 */
export const useLogGeneralAnalytics = () => {
  const {ready} = usePiwik()

  useLogAccessibilityAnalytics()
  const logDeviceInfoAnalytics = useLogDeviceInfoAnalytics()
  const logPermissionAnalytics = useLogPermissionAnalytics()

  const logGeneralAnalytics = useCallback(
    (action = PiwikAction.toForeground) => {
      logDeviceInfoAnalytics(action)
      logPermissionAnalytics(action)
    },
    [logDeviceInfoAnalytics, logPermissionAnalytics],
  )

  useEffect(() => {
    if (!ready) {
      return
    }

    logGeneralAnalytics(PiwikAction.startUp)

    // intentionally log this only once, when the Piwik initialization is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  return logGeneralAnalytics
}
