import {useCallback, useState} from 'react'
import {useSentry} from '@/processes/sentry/hooks/useSentry'
import {SentryErrorLogKey} from '@/processes/sentry/types'
import {getStatusFromError} from '@/utils/permissions/errorStatuses'
import {checkLocationPermissionGranted} from '@/utils/permissions/location'

export const useCheckLocationPermission = () => {
  const {sendSentryErrorLog} = useSentry()

  const [isCheckingLocationPermission, setCheckingLocationPermission] =
    useState(true)
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false)
  const checkLocationPermission = useCallback(() => {
    checkLocationPermissionGranted()
      .then(() => {
        setHasLocationPermission(true)
        setCheckingLocationPermission(false)
      })
      .catch((error: unknown) => {
        setHasLocationPermission(false)
        setCheckingLocationPermission(false)

        if (!getStatusFromError(error)) {
          sendSentryErrorLog(
            SentryErrorLogKey.locationPermission,
            'useCheckLocationPermission.ts',
            {error},
          )
        }
      })
  }, [sendSentryErrorLog])

  return {
    isCheckingLocationPermission,
    hasLocationPermission,
    checkLocationPermission,
  }
}
