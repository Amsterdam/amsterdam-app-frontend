import {useCallback, useState} from 'react'
import {useSentry} from '@/hooks/sentry/useSentry'
import {getStatusFromError} from '@/modules/address/hooks/useGetCurrentPosition'
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
            'requestLocationPermission failed',
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
