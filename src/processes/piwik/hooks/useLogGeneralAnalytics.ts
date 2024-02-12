import {useCallback} from 'react'
import {PiwikAction, usePiwik} from '@/processes/piwik/hooks/usePiwik'

// TO DO
const useLogAccessibilityAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(() => {
    trackCustomEvent('general', PiwikAction.toForeground, {
      name: 'accessibility',
    })
  }, [trackCustomEvent])
}

// TO DO
const useLogPermissionAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(() => {
    trackCustomEvent('general', PiwikAction.toForeground, {
      name: 'permissions',
    })
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
