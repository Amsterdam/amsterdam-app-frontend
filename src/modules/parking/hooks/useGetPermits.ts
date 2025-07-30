import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSetParkingAccountName} from '@/modules/parking/hooks/useSetParkingAccountName'
import {usePermitsQuery} from '@/modules/parking/service'
import {
  parkingSlice,
  useCurrentParkingPermitReportCode,
} from '@/modules/parking/slice'

export const useGetPermits = (skip?: boolean) => {
  const dispatch = useDispatch()
  const {
    data: permits,
    isLoading,
    refetch,
  } = usePermitsQuery({status: 'ACTIVE'}, {skip})

  useSetParkingAccountName(!permits)
  const currentPermitReportCode = useCurrentParkingPermitReportCode()
  const {setCurrentPermitReportCode, setParkingAccountPermits} =
    parkingSlice.actions

  useEffect(() => {
    if (permits?.length && !currentPermitReportCode) {
      setCurrentPermitReportCode(permits[0].report_code.toString())
    }
  }, [currentPermitReportCode, permits, setCurrentPermitReportCode])

  useEffect(() => {
    if (permits?.length) {
      dispatch(setParkingAccountPermits(permits))
    }
  }, [permits, dispatch, setParkingAccountPermits])

  return {
    permits,
    isLoading,
    refetch,
  }
}
