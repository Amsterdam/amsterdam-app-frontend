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

/**
 * Returns a function to check or request a permission and to store the result in the redux state. The function returns a promise that only resolves if the permission is granted.
 */
export const useUpdatePermission = <T extends AnyAction>(
  permission: AndroidPermission | IOSPermission,
  actionCreator: ActionCreator<T>,
  request = false,
  /** Prevent log warnings by not rejecting  */
  silent = false,
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

            if (!silent) {
              reject()
            }
          })
      }),
    [
      actionCreator,
      dispatch,
      fn,
      permission,
      request,
      sendSentryErrorLog,
      silent,
    ],
  )
}
