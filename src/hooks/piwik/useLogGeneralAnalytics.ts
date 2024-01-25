import {useCallback} from 'react'
import {
  PiwikAction,
  PiwikCategory,
  PiwikSessionDimension,
  usePiwik,
} from '@/hooks/piwik/usePiwik'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {useCheckLocationPermission} from '@/modules/address/hooks/useCheckLocationPermission'

const useLogA11yAnalytics = () => {
  const {trackCustomEvent} = usePiwik()
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
  const {trackCustomEvent} = usePiwik()
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
  const logA11yAnalytics = useLogA11yAnalytics()
  const logPermissionAnalytics = useLogPermissionAnalytics()

  return useCallback(() => {
    logA11yAnalytics()
    logPermissionAnalytics()
  }, [logA11yAnalytics, logPermissionAnalytics])
}
