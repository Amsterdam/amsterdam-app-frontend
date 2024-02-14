import {useEffect} from 'react'
import {AccessibilityInfo} from 'react-native'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwik,
} from '@/processes/piwik/hooks/usePiwik'
import {
  type AccessibilityFeatureLogConfig,
  type CustomDimensions,
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

const getDimensions = (results: boolean[]) =>
  accessibilityFeatures.reduce<CustomDimensions>((acc, {dimension}, i) => {
    acc[dimension] = results[i].toString()

    return acc
  }, {})

export const useLogAccessibilityAnalytics = () => {
  const {ready, trackCustomEvent} = usePiwik()

  useEffect(() => {
    if (!ready) {
      return
    }

    void Promise.all(
      accessibilityFeatures.map(({getIsEnabled}) => getIsEnabled()),
    ).then(results => {
      trackCustomEvent('general', PiwikAction.startUp, getDimensions(results))
    })

    // intentionally do this only once, when the Piwik initialization is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  useEffect(() => {
    const subscriptions = accessibilityFeatures.map(accessibilityFeature =>
      AccessibilityInfo.addEventListener(
        accessibilityFeature.eventName,
        (isEnabled: boolean) => {
          trackCustomEvent('general', PiwikAction.accessibilityChange, {
            [accessibilityFeature.dimension]: isEnabled.toString(),
          })
        },
      ),
    )

    return () => subscriptions.forEach(({remove}) => remove())
  }, [trackCustomEvent])
}
