import {useLogAccessibilityAnalytics} from '@/processes/piwik/hooks/useLogAccessibilityAnalytics'
import {useLogDeviceInfoAnalytics} from '@/processes/piwik/hooks/useLogDeviceInfoAnalytics'
import {useLogPermissionAnalytics} from '@/processes/piwik/hooks/useLogPermissionAnalytics'

export const useLogGeneralAnalytics = () => {
  useLogAccessibilityAnalytics()
  useLogDeviceInfoAnalytics()
  useLogPermissionAnalytics()
}
