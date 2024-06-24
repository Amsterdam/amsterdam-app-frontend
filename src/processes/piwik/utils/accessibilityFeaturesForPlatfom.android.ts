import {AccessibilityChangeEventName, AccessibilityInfo} from 'react-native'
import {PiwikSessionDimension} from '@/processes/logging/hooks/useTrackEvents'
import {type AccessibilityFeatureLogConfig} from '@/processes/piwik/types'

export const accessibilityFeaturesForPlatfom: AccessibilityFeatureLogConfig[] =
  [
    {
      dimension: PiwikSessionDimension.accessibilityServiceEnabled,
      // As per https://reactnative.dev/docs/accessibilityinfo#addeventlistener this event exists; in this case the AccessibilityChangeEventName type is incorrect
      eventName: 'accessibilityServiceChanged' as AccessibilityChangeEventName,
      getIsEnabled: () => AccessibilityInfo.isAccessibilityServiceEnabled(),
    },
  ]
