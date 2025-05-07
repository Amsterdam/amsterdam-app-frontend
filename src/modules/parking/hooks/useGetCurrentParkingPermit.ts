import {useMemo} from 'react'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {useCurrentParkingPermitName} from '@/modules/parking/slice'

/**
 * @deprecated use useCurrentParkingPermit instead, unless you need to get the current permit outside of the provider
 */
export const useGetCurrentParkingPermit = () => {
  const {permits, isLoading} = useGetPermits()
  const {currentPermitName} = useCurrentParkingPermitName()

  const currentPermit = useMemo(
    () => permits?.find(permit => permit.permit_name === currentPermitName),
    [currentPermitName, permits],
  )

  return {currentPermit, isLoading}
}
