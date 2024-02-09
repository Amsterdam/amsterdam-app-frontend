import {useCallback, useEffect} from 'react'
import {AccessibilityChangeEventName, AccessibilityInfo} from 'react-native'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwikOutsideNavigation,
} from '@/hooks/piwik/usePiwik'

export type AccessibilityFeatureForLogging = {
  eventName: AccessibilityChangeEventName | 'accessibilityServiceChanged' //TODO: remove this when react-native added this event
  feature: Promise<boolean>
  piwikDimension: PiwikSessionDimension
}

export const accessibilityFeaturesForLogging: AccessibilityFeatureForLogging[] =
  [
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

export const useLogAccessibilityAnalyticsForPlatform = (
  accessibilityFeatureForPlatform: AccessibilityFeatureForLogging[] = [],
) => {
  const {trackCustomEvent} = usePiwikOutsideNavigation()
  const accessibilityFeaturesToLog = [
    ...accessibilityFeatureForPlatform,
    ...accessibilityFeaturesForLogging,
  ]

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
    accessibilityFeaturesToLog.forEach(accessibilityFeature => {
      const {feature, piwikDimension} = accessibilityFeature

      void feature.then(isEnabled => {
        trackCustomGeneralEvent(
          PiwikAction.onStartUp,
          piwikDimension,
          isEnabled,
        )
      })
    })

    const listeners = accessibilityFeaturesToLog.map(accessibilityFeature =>
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
