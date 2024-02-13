import {useCallback} from 'react'
import {useLogAccessibilityAnalytics} from '@/processes/piwik/hooks/useLogAccessibilityAnalytics'
import {useLogDeviceInfoAnalytics} from '@/processes/piwik/hooks/useLogDeviceInfoAnalytics'
import {useLogPermissionAnalytics} from '@/processes/piwik/hooks/useLogPermissionAnalytics'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {PiwikAction} from '@/processes/piwik/types'

export {PiwikAction} from '@/processes/piwik/types'

/**
 * Any session related data can be logged here, e.g. which permissions a user has given.
 */
export const useLogGeneralAnalytics = () => {
  const {ready} = usePiwik()

  useLogAccessibilityAnalytics()
  const logDeviceInfoAnalytics = useLogDeviceInfoAnalytics()
  const logPermissionAnalytics = useLogPermissionAnalytics()

  return {
    logGeneralAnalytics: useCallback(
      (action = PiwikAction.toForeground) => {
        logDeviceInfoAnalytics(action)
        logPermissionAnalytics(action)
      },
      [logDeviceInfoAnalytics, logPermissionAnalytics],
    ),
    ready,
  }
}
