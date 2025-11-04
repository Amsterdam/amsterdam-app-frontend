import {useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useCurrentParkingApiVersion} from '@/modules/parking/hooks/useCurrentParkingApiVersion'
import {useSetParkingAccountName} from '@/modules/parking/hooks/useSetParkingAccountName'
import {usePermitsQuery} from '@/modules/parking/service'
import {
  parkingSlice,
  useCurrentParkingPermitReportCode,
} from '@/modules/parking/slice'
import {ParkingApiVersion} from '@/modules/parking/types'
import {filterPermits} from '@/modules/parking/utils/filterPermits'

export const useGetPermits = (skip?: boolean) => {
  const dispatch = useDispatch()
  const {data, isLoading, refetch} = usePermitsQuery({status: 'ACTIVE'}, {skip})
  const apiVersion = useCurrentParkingApiVersion()

  const currentPermitReportCode = useCurrentParkingPermitReportCode()
  const {setCurrentPermitReportCode, setParkingAccountPermits} =
    parkingSlice.actions

  const permits = useMemo(() => {
    if (!data) {
      return
    }

    if (apiVersion === ParkingApiVersion.v2) {
      return filterPermits(data)
    }

    return data
  }, [apiVersion, data])

  useSetParkingAccountName(!permits)

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
