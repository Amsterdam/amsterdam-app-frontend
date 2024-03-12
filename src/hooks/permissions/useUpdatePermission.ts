import {ActionCreator, AnyAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {AndroidPermission, IOSPermission} from 'react-native-permissions'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {getStatusFromError} from '@/utils/permissions/errorStatuses'
import {
  checkIsPermissionGranted,
  requestIsPermissionGranted,
} from '@/utils/permissions/isPermissionGranted'

export const useUpdatePermission = <T extends AnyAction>(
  permission: AndroidPermission | IOSPermission,
  actionCreator: ActionCreator<T>,
  request = false,
) => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  const fn = request ? requestIsPermissionGranted : checkIsPermissionGranted

  return useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        fn(permission)
          .then(() => {
            dispatch(actionCreator(true))
            resolve()
          })
          .catch((error: unknown) => {
            dispatch(actionCreator(false))

            if (!getStatusFromError(error)) {
              sendSentryErrorLog(
                SentryErrorLogKey.updatePermission,
                'useUpdatePermission.ts',
                {error, permission, request},
              )
            }

            reject()
          })
      }),
    [actionCreator, dispatch, fn, permission, request, sendSentryErrorLog],
  )
}
