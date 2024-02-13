import {useCallback} from 'react'
import {PiwikAction, usePiwik} from '@/processes/piwik/hooks/usePiwik'

// TO DO
const useLogAccessibilityAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(() => {
    trackCustomEvent('accessibility', PiwikAction.toForeground, {}, 'general')
  }, [trackCustomEvent])
}

// TO DO
const useLogPermissionAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(() => {
    trackCustomEvent('permissions', PiwikAction.toForeground, {}, 'general')
  }, [trackCustomEvent])
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
