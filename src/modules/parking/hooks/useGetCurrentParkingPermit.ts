import {useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useGetPermits} from '@/modules/parking/hooks/useGetPermits'
import {
  parkingSlice,
  useCurrentParkingPermitReportCode,
} from '@/modules/parking/slice'

/**
 * @deprecated use useCurrentParkingPermit instead, unless you need to get the current permit outside of the provider
 */
export const useGetCurrentParkingPermit = () => {
  const dispatch = useDispatch()
  const {isLoading, permits, refetch} = useGetPermits()
  const currentPermitReportCode = useCurrentParkingPermitReportCode()
  const {setCurrentPermitReportCode} = parkingSlice.actions

  const currentPermit = useMemo(
    () =>
      permits?.find(
        permit => permit.report_code === Number(currentPermitReportCode),
      ),
    [currentPermitReportCode, permits],
  )

  useEffect(() => {
    if (!currentPermit && permits?.[0]) {
      dispatch(setCurrentPermitReportCode(String(permits[0].report_code)))
    }
  }, [currentPermit, dispatch, permits, setCurrentPermitReportCode])

  return {currentPermit, isLoading, refetch}
}
