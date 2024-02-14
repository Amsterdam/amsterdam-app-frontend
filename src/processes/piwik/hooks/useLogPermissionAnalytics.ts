import {useCallback, useEffect} from 'react'
import {
  type PermissionStatus,
  RESULTS,
  check,
  checkNotifications,
} from 'react-native-permissions'
import {useAppState} from '@/hooks/useAppState'
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
  const {ready, trackCustomEvent} = usePiwik()

  const logPermissions = useCallback(
    (action: PiwikAction) => {
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

  useEffect(() => {
    if (!ready) {
      return
    }

    logPermissions(PiwikAction.startUp)

    // intentionally log this only once, when the Piwik initialization is ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  useAppState({
    onForeground: useCallback(() => {
      logPermissions(PiwikAction.toForeground)
    }, [logPermissions]),
  })
}
