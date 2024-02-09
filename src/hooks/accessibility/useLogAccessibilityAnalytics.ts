import {AccessibilityInfo} from 'react-native'
import {
  AccessibilityFeatureForLogging,
  useLogAccessibilityAnalyticsForPlatform,
} from '@/hooks/accessibility/useLogAccessibilityAnalyticsForPlatform'
import {PiwikSessionDimension} from '@/hooks/piwik/usePiwik'

export const accessibilityFeaturesIOSOnly: AccessibilityFeatureForLogging[] = [
  {
    feature: AccessibilityInfo.isBoldTextEnabled(),
    eventName: 'boldTextChanged',
    piwikDimension: PiwikSessionDimension.boldTextEnabled,
  },
  {
    feature: AccessibilityInfo.isGrayscaleEnabled(),
    eventName: 'grayscaleChanged',
    piwikDimension: PiwikSessionDimension.grayscaleEnabled,
  },
  {
    feature: AccessibilityInfo.isInvertColorsEnabled(),
    eventName: 'invertColorsChanged',
    piwikDimension: PiwikSessionDimension.invertColorsEnabled,
  },
  {
    feature: AccessibilityInfo.isReduceTransparencyEnabled(),
    eventName: 'reduceTransparencyChanged',
    piwikDimension: PiwikSessionDimension.reduceTransparencyEnabled,
  },
]

export const useLogAccessibilityAnalytics = () => {
  useLogAccessibilityAnalyticsForPlatform(accessibilityFeaturesIOSOnly)
}
