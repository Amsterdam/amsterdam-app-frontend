import {AccessibilityInfo} from 'react-native'
import {PiwikSessionDimension} from '@/processes/piwik/hooks/usePiwik'
import {AccessibilityFeatureLogConfig} from '@/processes/piwik/types'

const {
  isBoldTextEnabled,
  isGrayscaleEnabled,
  isInvertColorsEnabled,
  isReduceTransparencyEnabled,
} = AccessibilityInfo

export const accessibilityFeaturesForPlatfom: AccessibilityFeatureLogConfig[] =
  [
    {
      eventName: 'boldTextChanged',
      dimension: PiwikSessionDimension.boldTextEnabled,
      getIsEnabled: isBoldTextEnabled,
    },
    {
      eventName: 'grayscaleChanged',
      dimension: PiwikSessionDimension.grayscaleEnabled,
      getIsEnabled: isGrayscaleEnabled,
    },
    {
      eventName: 'invertColorsChanged',
      dimension: PiwikSessionDimension.invertColorsEnabled,
      getIsEnabled: isInvertColorsEnabled,
    },
    {
      eventName: 'reduceTransparencyChanged',
      dimension: PiwikSessionDimension.reduceTransparencyEnabled,
      getIsEnabled: isReduceTransparencyEnabled,
    },
  ]
