import {useCallback} from 'react'
import {useLogAccessibilityAnalytics} from '@/hooks/accessibility/useLogAccessibilityAnalytics'
import {PiwikAction, usePiwik} from '@/processes/piwik/hooks/usePiwik'

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
  useLogAccessibilityAnalytics()
  const logPermissionAnalytics = useLogPermissionAnalytics()

  return useCallback(() => {
    logPermissionAnalytics()
  }, [logPermissionAnalytics])
}
