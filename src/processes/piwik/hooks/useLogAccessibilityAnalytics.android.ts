import {AccessibilityInfo} from 'react-native'
import {
  AccessibilityFeatureForLogging,
  useLogAccessibilityAnalyticsForPlatform,
} from '@/processes/piwik/hooks/useLogAccessibilityAnalyticsForPlatform'
import {PiwikSessionDimension} from '@/processes/piwik/hooks/usePiwik'

export const accessibilityFeaturesAndroidOnly: AccessibilityFeatureForLogging[] =
  [
    {
      feature: AccessibilityInfo.isAccessibilityServiceEnabled(),
      eventName: 'accessibilityServiceChanged',
      piwikDimension: PiwikSessionDimension.accessibilityServiceEnabled,
    },
  ]

export const useLogAccessibilityAnalytics = () => {
  useLogAccessibilityAnalyticsForPlatform(accessibilityFeaturesAndroidOnly)
}
