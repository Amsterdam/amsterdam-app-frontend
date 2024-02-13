import {AccessibilityInfo} from 'react-native'
import {AccessibilityFeatureForLogging} from '@/processes/piwik/hooks/useLogAccessibilityAnalytics'
import {PiwikSessionDimension} from '@/processes/piwik/hooks/usePiwik'

export const accessibilityFeaturesForPlatfom: AccessibilityFeatureForLogging[] =
  [
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
