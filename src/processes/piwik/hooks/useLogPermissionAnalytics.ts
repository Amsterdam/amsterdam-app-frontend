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

const getValueFromResult = (result: PermissionStatus) =>
  (result === RESULTS.GRANTED).toString()

export const useLogPermissionAnalytics = () => {
  const {trackCustomEvent} = usePiwik()

  return useCallback(
    (action = PiwikAction.toForeground) => {
      void Promise.all([
        check(permissions.camera),
        check(permissions.location),
        check(permissions.photo),
        checkNotifications(),
      ]).then(
        ([resultCamera, resultLocation, resultPhoto, resultNotifications]) => {
          trackCustomEvent('general', action, {
            name: 'permissions',
            customDimensions: {
              [PiwikSessionDimension.hasCameraPermission]:
                getValueFromResult(resultCamera),
              [PiwikSessionDimension.hasLocationPermission]:
                getValueFromResult(resultLocation),
              [PiwikSessionDimension.hasPhotosPermission]:
                getValueFromResult(resultPhoto),
              [PiwikSessionDimension.hasNotificationPermission]:
                getValueFromResult(resultNotifications.status),
            },
          })
        },
      )
    },
    [trackCustomEvent],
  )
}
