import {AccessibilityInfo} from 'react-native'
import {
  AccessibilityFeatureForLogging,
  useLogAccessibilityAnalyticsForPlatform,
} from '@/hooks/piwik/useLogAccessibilityAnalyticsForPlatform'
import {PiwikSessionDimension} from '@/hooks/piwik/usePiwik'

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
