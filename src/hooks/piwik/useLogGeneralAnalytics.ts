import {useCallback} from 'react'
import {
  PiwikAction,
  PiwikCategory,
  PiwikSessionDimension,
  usePiwikOutsideNavigation,
} from '@/hooks/piwik/usePiwik'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {useCheckLocationPermission} from '@/modules/address/hooks/useCheckLocationPermission'

const useLogAccessibilityAnalytics = () => {
  const {trackCustomEvent} = usePiwikOutsideNavigation()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  return useCallback(() => {
    trackCustomEvent(PiwikCategory.general, PiwikAction.toForeground, {
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
  const {trackCustomEvent} = usePiwikOutsideNavigation()
  const {hasLocationPermission} = useCheckLocationPermission()

  return useCallback(() => {
    trackCustomEvent(PiwikCategory.general, PiwikAction.toForeground, {
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
