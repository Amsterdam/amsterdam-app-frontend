import {useCallback} from 'react'
import {useLogAccessibilityAnalytics} from '@/processes/piwik/hooks/useLogAccessibilityAnalytics'
import {useLogDeviceInfoAnalytics} from '@/processes/piwik/hooks/useLogDeviceInfoAnalytics'
import {useLogPermissionAnalytics} from '@/processes/piwik/hooks/useLogPermissionAnalytics'

/**
 * Any session related data can be logged here, e.g. which permissions a user has given.
 */
export const useLogGeneralAnalytics = () => {
  useLogAccessibilityAnalytics()
  const logDeviceInfoAnalytics = useLogDeviceInfoAnalytics()
  const logPermissionAnalytics = useLogPermissionAnalytics()

  return useCallback(() => {
    logDeviceInfoAnalytics()
    logPermissionAnalytics()
  }, [logDeviceInfoAnalytics, logPermissionAnalytics])
}
