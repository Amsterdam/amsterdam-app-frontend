import {TrackCustomEventOptions} from '@piwikpro/react-native-piwik-pro-sdk/lib/typescript/types'
import {useEffect} from 'react'
import {AccessibilityInfo} from 'react-native'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwik,
} from '@/processes/piwik/hooks/usePiwik'
import {
  AccessibilityFeatureLogConfig,
  CustomDimensions,
} from '@/processes/piwik/types'
import {accessibilityFeaturesForPlatfom} from '@/processes/piwik/utils/accessibilityFeaturesForPlatfom'

const {isReduceMotionEnabled, isScreenReaderEnabled} = AccessibilityInfo

export const accessibilityFeatures: AccessibilityFeatureLogConfig[] = [
  ...accessibilityFeaturesForPlatfom,
  {
    dimension: PiwikSessionDimension.reduceMotionEnabled,
    eventName: 'reduceMotionChanged',
    getIsEnabled: isReduceMotionEnabled,
  },
  {
    dimension: PiwikSessionDimension.screenReaderEnabled,
    eventName: 'screenReaderChanged',
    getIsEnabled: isScreenReaderEnabled,
  },
]

const getDimensions = (results: boolean[]) => {
  const dimensions: CustomDimensions = {}

  accessibilityFeatures.forEach(({dimension}, i) => {
    dimensions[dimension] = results[i].toString()
  })

  return dimensions
}

export const useLogAccessibilityAnalytics = () => {
  const {ready, trackCustomEvent} = usePiwik()

  useEffect(() => {
    void Promise.all(
      accessibilityFeatures.map(({getIsEnabled}) => getIsEnabled()),
    ).then(results => {
      trackCustomEvent('general', PiwikAction.startUp, {
        customDimensions: getDimensions(results),
      } as TrackCustomEventOptions)
    })

    const subscriptions = accessibilityFeatures.map(accessibilityFeature =>
      AccessibilityInfo.addEventListener(
        accessibilityFeature.eventName,
        (isEnabled: boolean) => {
          trackCustomEvent('general', PiwikAction.accessibilityEventListener, {
            customDimensions: {
              [accessibilityFeature.dimension]: isEnabled.toString(),
            },
          })
        },
      ),
    )

    return () => subscriptions.forEach(({remove}) => remove())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])
}
