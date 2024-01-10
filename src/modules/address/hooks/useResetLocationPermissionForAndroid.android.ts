import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAppState} from '@/hooks/useAppState'
import {setNoLocationPermissionForAndroid} from '@/modules/address/slice'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
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
              SentryErrorLogKey.resetLocationPermissionAndroid,
              'useResetLocationPermissionForAndroid.android.ts',
              {error},
            )
          }
        })
    }, [dispatch, sendSentryErrorLog]),
  })
}
