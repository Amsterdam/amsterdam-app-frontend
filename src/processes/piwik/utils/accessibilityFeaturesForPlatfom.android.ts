import {AccessibilityChangeEventName, AccessibilityInfo} from 'react-native'
import {PiwikSessionDimension} from '@/processes/piwik/hooks/usePiwik'
import {AccessibilityFeatureLogConfig} from '@/processes/piwik/types'

export const accessibilityFeaturesForPlatfom: AccessibilityFeatureLogConfig[] =
  [
    {
      dimension: PiwikSessionDimension.accessibilityServiceEnabled,
      eventName: 'accessibilityServiceChanged' as AccessibilityChangeEventName, //TODO: remove this cast, when react-native added this event
      getIsEnabled: () => AccessibilityInfo.isAccessibilityServiceEnabled(),
    },
  ]
