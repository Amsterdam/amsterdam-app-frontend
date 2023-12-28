import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSentry} from '@/hooks/sentry/useSentry'
import {useAppState} from '@/hooks/useAppState'
import {setNoLocationPermissionForAndroid} from '@/modules/address/slice'
import {SentryLogKey} from '@/types/sentry'
import {getStatusFromError} from '@/utils/permissions/errorStatuses'
import {checkLocationPermissionGranted} from '@/utils/permissions/location'

export const useResetLocationPermissionForAndroid = () => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  useAppState({
    onForeground: useCallback(() => {
      checkLocationPermissionGranted()
        .then(() => {
          dispatch(setNoLocationPermissionForAndroid(false))
        })
        .catch((error: unknown) => {
          if (!getStatusFromError(error)) {
            sendSentryErrorLog(
              SentryLogKey.resetLocationPermissionAndroid,
              'useResetLocationPermissionForAndroid.android.ts',
              {error},
            )
          }
        })
    }, [dispatch, sendSentryErrorLog]),
  })
}
