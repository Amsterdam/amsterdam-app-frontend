import {useCallback} from 'react'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {useCheckLocationPermission} from '@/modules/address/hooks/useCheckLocationPermission'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwik,
} from '@/processes/piwik/hooks/usePiwik'

const useLogAccessibilityAnalytics = () => {
  const {trackCustomEvent} = usePiwik()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  return useCallback(() => {
    trackCustomEvent('general', PiwikAction.toForeground, {
      name: 'accessibility',
      customDimensions: {
        [PiwikSessionDimension.screenReaderEnabled]:
          isScreenReaderEnabled.toString(),
        [PiwikSessionDimension.reduceMotionEnabled]:
          isReduceMotionEnabled?.toString(),
      },
    })
  }, [isReduceMotionEnabled, isScreenReaderEnabled, trackCustomEvent])
}

const useLogPermissionAnalytics = () => {
  const {trackCustomEvent} = usePiwik()
  const {hasLocationPermission} = useCheckLocationPermission()

  return useCallback(() => {
    trackCustomEvent('general', PiwikAction.toForeground, {
      name: 'permissions',
      customDimensions: {
        [PiwikSessionDimension.locationPermission]:
          hasLocationPermission.toString(),
      },
    })
  }, [hasLocationPermission, trackCustomEvent])
}

/**
 * Any session related data can be logged here, e.g. which permissions a user has given.
 */
export const useLogGeneralAnalytics = () => {
  const logAccessibilityAnalytics = useLogAccessibilityAnalytics()
  const logPermissionAnalytics = useLogPermissionAnalytics()

  return useCallback(() => {
    logAccessibilityAnalytics()
    logPermissionAnalytics()
  }, [logAccessibilityAnalytics, logPermissionAnalytics])
}
