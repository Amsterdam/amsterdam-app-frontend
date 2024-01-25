import {useCallback} from 'react'
import {PiwikAction, PiwikCategory, usePiwik} from '@/hooks/piwik/usePiwik'
import {useIsReduceMotionEnabled} from '@/hooks/useIsReduceMotionEnabled'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {useCheckLocationPermission} from '@/modules/address/hooks/useCheckLocationPermission'
import {PiwikDimensions} from '@/types/piwik'

const useLogA11yAnalytics = () => {
  const {trackCustomEvent} = usePiwik()
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  return useCallback(() => {
    trackCustomEvent(PiwikCategory.general, PiwikAction.toForeground, {
      name: 'accessibility',
      customDimensions: {
        [PiwikDimensions.screenReaderEnabled]: isScreenReaderEnabled.toString(),
        [PiwikDimensions.reduceMotionEnabled]:
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
        [PiwikDimensions.locationPermission]: hasLocationPermission.toString(),
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
