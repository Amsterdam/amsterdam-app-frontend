import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {usePermitsQuery} from '@/modules/parking/service'
import {
  parkingSlice,
  useCurrentParkingPermitReportCode,
} from '@/modules/parking/slice'

export const useGetPermits = () => {
  const dispatch = useDispatch()
  const {data, isLoading, refetch} = usePermitsQuery({status: 'ACTIVE'})
  const currentPermitReportCode = useCurrentParkingPermitReportCode()
  const {setCurrentPermitReportCode, setParkingAccountPermits} =
    parkingSlice.actions

  useEffect(() => {
    if (data?.length && !currentPermitReportCode) {
      setCurrentPermitReportCode(data[0].report_code.toString())
    }
  }, [currentPermitReportCode, data, setCurrentPermitReportCode])

  useEffect(() => {
    if (data?.length) {
      dispatch(setParkingAccountPermits(data))
    }
  }, [data, dispatch, setParkingAccountPermits])

  return {
    permits: data,
    isLoading,
    refetch,
  }
}
