import {useCallback} from 'react'
import {
  PermissionStatus,
  RESULTS,
  check,
  checkNotifications,
} from 'react-native-permissions'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwik,
} from '@/processes/piwik/hooks/usePiwik'
import {permissions} from '@/utils/permissions/permissions'

export const permissionsForLogging = [
  {
    permissionByPlatform: permissions.camera,
    piwikDimension: PiwikSessionDimension.hasCameraPermission,
  },
  {
    permissionByPlatform: permissions.location,
    piwikDimension: PiwikSessionDimension.hasLocationPermission,
  },
  {
    permissionByPlatform: permissions.photo,
    piwikDimension: PiwikSessionDimension.hasPhotosPermission,
  },
]

export const useLogPermissionAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  const logPermissionAnalytics = useCallback(
    (result: PermissionStatus, piwikDimension: PiwikSessionDimension) => {
      trackCustomEvent('general', PiwikAction.toForeground, {
        name: 'permissions',
        customDimensions: {
          [piwikDimension]: result === RESULTS.GRANTED ? 'true' : 'false',
        },
      })
    },
    [trackCustomEvent],
  )

  return useCallback(() => {
    permissionsForLogging.forEach(permission => {
      void check(permission.permissionByPlatform).then(result => {
        logPermissionAnalytics(result, permission.piwikDimension)
      })
    })
    void checkNotifications().then(result => {
      logPermissionAnalytics(
        result.status,
        PiwikSessionDimension.hasNotificationPermission,
      )
    })
  }, [logPermissionAnalytics])
}
