import {useCallback, useEffect} from 'react'
import {AccessibilityChangeEventName, AccessibilityInfo} from 'react-native'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwik,
} from '@/processes/piwik/hooks/usePiwik'
import {accessibilityFeaturesForPlatfom} from '@/processes/piwik/utils/accessibilityFeaturesForPlatfom'

export type AccessibilityFeatureForLogging = {
  eventName: AccessibilityChangeEventName | 'accessibilityServiceChanged' //TODO: remove this when react-native added this event
  feature: Promise<boolean>
  piwikDimension: PiwikSessionDimension
}

export const accessibilityFeatures: AccessibilityFeatureForLogging[] = [
  ...accessibilityFeaturesForPlatfom,
  {
    feature: AccessibilityInfo.isScreenReaderEnabled(),
    eventName: 'screenReaderChanged',
    piwikDimension: PiwikSessionDimension.screenReaderEnabled,
  },
  {
    feature: AccessibilityInfo.isReduceMotionEnabled(),
    eventName: 'reduceMotionChanged',
    piwikDimension: PiwikSessionDimension.reduceMotionEnabled,
  },
]

export const useLogAccessibilityAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  const trackCustomGeneralEvent = useCallback(
    (
      piwikAction: PiwikAction,
      piwikDimension: PiwikSessionDimension,
      isEnabled: boolean,
    ) => {
      trackCustomEvent('general', piwikAction, {
        name: 'accessibility',
        customDimensions: {
          [piwikDimension]: isEnabled.toString(),
        },
      })
    },
    [trackCustomEvent],
  )

  useEffect(() => {
    accessibilityFeatures.forEach(accessibilityFeature => {
      const {feature, piwikDimension} = accessibilityFeature

      void feature.then(isEnabled => {
        trackCustomGeneralEvent(
          PiwikAction.onStartUp,
          piwikDimension,
          isEnabled,
        )
      })
    })

    const listeners = accessibilityFeatures.map(accessibilityFeature =>
      AccessibilityInfo.addEventListener(
        accessibilityFeature.eventName as AccessibilityChangeEventName,
        (isEnabled: boolean) => {
          trackCustomGeneralEvent(
            PiwikAction.accessibilityEventListener,
            accessibilityFeature.piwikDimension,
            isEnabled,
          )
        },
      ),
    )

    return () => listeners.forEach(l => l.remove())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
