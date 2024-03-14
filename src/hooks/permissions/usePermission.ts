import {useCallback} from 'react'
import {
  PermissionStatus,
  RESULTS,
  request,
  requestNotifications,
} from 'react-native-permissions'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {
  selectIsPermissionGranted,
  setPermission,
} from '@/store/slices/permissions'
import {
  PERMISSION_NOTIFICATIONS,
  Permissions,
} from '@/utils/permissions/permissionsForPlatform'

const requestPermission = async (
  permission: Permissions,
): Promise<PermissionStatus> => {
  if (permission === PERMISSION_NOTIFICATIONS) {
    const result = await requestNotifications([
      'alert',
      'badge',
      'carPlay',
      'sound',
    ])

    return result.status
  }

  return request(permission)
}

export const usePermission = (permission: Permissions) => {
  const hasPermission = useSelector(selectIsPermissionGranted(permission))
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  const requestPermissionFn = useCallback(
    () =>
      new Promise<boolean>((resolve, reject) => {
        requestPermission(permission)
          .then(result => {
            const granted = result === RESULTS.GRANTED

            dispatch(setPermission({permission, granted}))
            resolve(granted)
          })
          .catch((error: unknown) => {
            dispatch(setPermission({permission, granted: false}))

            sendSentryErrorLog(
              SentryErrorLogKey.updatePermission,
              'useUPermission.ts',
              {error, permission, request},
            )

            reject(error)
          })
      }),
    [dispatch, permission, sendSentryErrorLog],
  )

  return {hasPermission, requestPermission: requestPermissionFn}
}
