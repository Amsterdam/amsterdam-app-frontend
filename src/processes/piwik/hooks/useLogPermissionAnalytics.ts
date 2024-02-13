import {useCallback} from 'react'
import {
  type PermissionStatus,
  RESULTS,
  check,
  checkNotifications,
} from 'react-native-permissions'
import {
  PiwikAction,
  PiwikSessionDimension,
  usePiwik,
} from '@/processes/piwik/hooks/usePiwik'
import {
  PERMISSION_CAMERA,
  PERMISSION_LOCATION,
  PERMISSION_PHOTOS,
} from '@/utils/permissions/permissionsForPlatform'

const getValueFromResult = (result: PermissionStatus) =>
  (result === RESULTS.GRANTED).toString()

export const useLogPermissionAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(
    (action = PiwikAction.toForeground) => {
      void Promise.all([
        check(PERMISSION_CAMERA),
        check(PERMISSION_LOCATION),
        check(PERMISSION_PHOTOS),
        checkNotifications(),
      ]).then(
        ([resultCamera, resultLocation, resultPhoto, resultNotifications]) => {
          trackCustomEvent('permissions', action, {
            [PiwikSessionDimension.hasCameraPermission]:
              getValueFromResult(resultCamera),
            [PiwikSessionDimension.hasLocationPermission]:
              getValueFromResult(resultLocation),
            [PiwikSessionDimension.hasPhotosPermission]:
              getValueFromResult(resultPhoto),
            [PiwikSessionDimension.hasNotificationPermission]:
              getValueFromResult(resultNotifications.status),
          })
        },
      )
    },
    [trackCustomEvent],
  )
}
