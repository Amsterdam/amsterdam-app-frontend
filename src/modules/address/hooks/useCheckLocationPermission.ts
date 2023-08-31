import {useCallback, useState} from 'react'
import {
  getStatusFromError,
  permissionErrorStatuses,
} from '@/modules/address/hooks/useGetCurrentPosition'
import {requestLocationPermission} from '@/utils/permissions'

export const useCheckLocationPermission = () => {
  const [isCheckingLocationPermission, setCheckingLocationPermission] =
    useState(true)
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | undefined
  >(undefined)
  const checkLocationPermission = useCallback(() => {
    requestLocationPermission(false)
      .then(() => {
        setHasLocationPermission(true)
        setCheckingLocationPermission(false)
      })
      .catch(error => {
        const status = getStatusFromError(error)

        if (status && permissionErrorStatuses.includes(status)) {
          setHasLocationPermission(false)
          setCheckingLocationPermission(false)
        }
      })
  }, [])

  return {
    isCheckingLocationPermission,
    hasLocationPermission,
    checkLocationPermission,
  }
}
