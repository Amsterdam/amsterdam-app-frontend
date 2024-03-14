import {useCallback, useEffect} from 'react'
import {
  Permission,
  PermissionStatus,
  RESULTS,
  check,
  checkNotifications,
} from 'react-native-permissions'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAppState} from '@/hooks/useAppState'
import {usePiwik} from '@/processes/piwik/hooks/usePiwik'
import {
  CustomDimensions,
  PiwikAction,
  PiwikSessionDimension,
} from '@/processes/piwik/types'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {setPermission} from '@/store/slices/permissions'
import {
  PERMISSION_CAMERA,
  PERMISSION_LOCATION,
  PERMISSION_NOTIFICATIONS,
  PERMISSION_PHOTOS,
  Permissions,
} from '@/utils/permissions/permissionsForPlatform'

const PERMISSIONS: Array<{
  logDimension: PiwikSessionDimension
  permission: Permissions
}> = [
  {
    permission: PERMISSION_LOCATION,
    logDimension: PiwikSessionDimension.hasLocationPermission,
  },
  {
    permission: PERMISSION_CAMERA,
    logDimension: PiwikSessionDimension.hasCameraPermission,
  },
  {
    permission: PERMISSION_PHOTOS,
    logDimension: PiwikSessionDimension.hasPhotosPermission,
  },
  {
    permission: PERMISSION_NOTIFICATIONS,
    logDimension: PiwikSessionDimension.hasNotificationPermission,
  },
]

const checkPermission = async (
  permission: Permission | typeof PERMISSION_NOTIFICATIONS,
): Promise<PermissionStatus> => {
  if (permission === PERMISSION_NOTIFICATIONS) {
    const result = await checkNotifications()

    return result.status
  }

  return check(permission)
}

export const useCheckPermissions = () => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()
  const {ready, trackCustomEvent} = usePiwik()

  const checkPermissions = useCallback(
    (action = PiwikAction.toForeground) => {
      void Promise.all(
        PERMISSIONS.map(
          ({permission}) =>
            new Promise<boolean>(resolve => {
              checkPermission(permission)
                .then(result => {
                  const granted = result === RESULTS.GRANTED

                  dispatch(setPermission({permission, granted}))
                  resolve(granted)
                })
                .catch((error: unknown) => {
                  dispatch(setPermission({permission, granted: false}))

                  sendSentryErrorLog(
                    SentryErrorLogKey.updatePermission,
                    'useCheckPermissions.ts',
                    {error, permission, request: false},
                  )

                  resolve(false)
                })
            }),
        ),
      ).then((results: boolean[]) => {
        if (ready) {
          const dimensions = results.reduce<CustomDimensions>(
            (acc, granted, index) => ({
              ...acc,
              [PERMISSIONS[index].logDimension]: granted.toString(),
            }),
            {},
          )

          trackCustomEvent('permissions', action, dimensions)
        }
      })
    },
    [dispatch, sendSentryErrorLog, trackCustomEvent, ready],
  )

  useEffect(() => {
    checkPermissions(PiwikAction.startUp)
  }, [checkPermissions])

  useAppState({
    onForeground: checkPermissions,
  })
}
