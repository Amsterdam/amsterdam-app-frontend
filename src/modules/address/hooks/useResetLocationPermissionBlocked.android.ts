import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSentry} from '@/hooks/sentry/useSentry'
import {useAppState} from '@/hooks/useAppState'
import {setLocationPermissionBlockedForAndroid} from '@/modules/address/slice'
import {getStatusFromError} from '@/utils/permissions/errorStatuses'
import {checkLocationPermissionGranted} from '@/utils/permissions/location'

export const useResetLocationPermissionBlocked = () => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  useAppState({
    onForeground: useCallback(() => {
      checkLocationPermissionGranted()
        .then(() => {
          dispatch(setLocationPermissionBlockedForAndroid(false))
        })
        .catch((error: unknown) => {
          if (!getStatusFromError(error)) {
            sendSentryErrorLog(
              'Check location permission on foreground failed',
              'useResetLocationPermissionBlockedForAndroid.android.ts',
              {error},
            )
          }
        })
    }, [dispatch, sendSentryErrorLog]),
  })
}
