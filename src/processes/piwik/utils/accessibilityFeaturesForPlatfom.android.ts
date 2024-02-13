import {AccessibilityInfo} from 'react-native'
import {AccessibilityFeatureForLogging} from '@/processes/piwik/hooks/useLogAccessibilityAnalytics'
import {PiwikSessionDimension} from '@/processes/piwik/hooks/usePiwik'

export const accessibilityFeaturesForPlatfom: AccessibilityFeatureForLogging[] =
  [
    {
      feature: AccessibilityInfo.isAccessibilityServiceEnabled(),
      eventName: 'accessibilityServiceChanged',
      piwikDimension: PiwikSessionDimension.accessibilityServiceEnabled,
    },
  ]
