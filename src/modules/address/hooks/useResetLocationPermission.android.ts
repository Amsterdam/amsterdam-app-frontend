import {useCallback} from 'react'
import {check, RESULTS as permissionStatuses} from 'react-native-permissions'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSentry} from '@/hooks/sentry/useSentry'
import {useAppState} from '@/hooks/useAppState'
import {setLocationPermissionBlockedForAndroid} from '@/modules/address/slice'
import {
  getStatusFromError,
  isPermissionErrorStatus,
} from '@/utils/permissions/errorStatuses'
import {locationPermission} from '@/utils/permissions/location'

export const useResetLocationPermission = () => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  useAppState({
    onForeground: useCallback(() => {
      check(locationPermission)
        .then(status => {
          if (status === permissionStatuses.GRANTED) {
            dispatch(setLocationPermissionBlockedForAndroid(false))
          }
        })
        .catch((error: unknown) => {
          const status = getStatusFromError(error)

          if (isPermissionErrorStatus(status)) {
            return
          }

          sendSentryErrorLog(
            'Check location permission on foreground failed',
            'useResetLocationPermission.android.ts',
            {error},
          )
        })
    }, [dispatch, sendSentryErrorLog]),
  })
}
