import {useLogAccessibilityAnalytics} from '@/processes/piwik/hooks/useLogAccessibilityAnalytics'
import {useLogDeviceInfoAnalytics} from '@/processes/piwik/hooks/useLogDeviceInfoAnalytics'
import {useLogModuleAnalytics} from '@/processes/piwik/hooks/useLogModuleAnalytics'

export const useLogGeneralAnalytics = () => {
  useLogAccessibilityAnalytics()
  useLogDeviceInfoAnalytics()
  useLogModuleAnalytics()
}
