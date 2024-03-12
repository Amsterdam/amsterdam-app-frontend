import {useCallback, useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAppState} from '@/hooks/useAppState'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {setHasLocationPermission} from '@/store/slices/permissions'
import {getStatusFromError} from '@/utils/permissions/errorStatuses'
import {checkLocationPermissionGranted} from '@/utils/permissions/location'

/**
 * Checks the location permission on start up and on foreground and saves it to the redux state.
 */
export const useCheckLocationPermission = () => {
  const dispatch = useDispatch()
  const {sendSentryErrorLog} = useSentry()

  const getSetPermission = useCallback(() => {
    checkLocationPermissionGranted()
      .then(() => {
        dispatch(setHasLocationPermission(true))
      })
      .catch((error: unknown) => {
        dispatch(setHasLocationPermission(false))

        if (!getStatusFromError(error)) {
          sendSentryErrorLog(
            SentryErrorLogKey.locationPermission,
            'useCheckLocationPermission.ts',
            {error},
          )
        }
      })
  }, [dispatch, sendSentryErrorLog])

  useEffect(() => {
    getSetPermission()
  }, [getSetPermission])

  useAppState({
    onForeground: getSetPermission,
  })
}
