import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useParkingSessionsQuery,
  useVisitorParkingSessionsQuery,
} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'

export const useGetParkingSessions = (
  status: ParkingSessionStatus,
  visitorVehicleId?: string,
) => {
  const currentPermit = useCurrentParkingPermit()

  const {
    data: parkingSessions,
    isLoading: isLoadingParkingSessions,
    isError: isParkingSessionsError,
    refetch: refetchParkingSessions,
  } = useParkingSessionsQuery(
    currentPermit && !visitorVehicleId
      ? {
          report_code: currentPermit.report_code.toString(),
          status,
          page_size: 100,
        }
      : skipToken,
  )
  const {
    data: visitorParkingSessions,
    isLoading: isLoadingVisitorParkingSessions,
    isError: isVisitorParkingSessionsError,
    refetch: refetchVisitorParkingSessions,
  } = useVisitorParkingSessionsQuery(
    visitorVehicleId
      ? {
          vehicle_id: visitorVehicleId,
        }
      : skipToken,
  )

  return {
    isLoading: isLoadingParkingSessions || isLoadingVisitorParkingSessions,
    isError: isParkingSessionsError || isVisitorParkingSessionsError,
    parkingSessions:
      parkingSessions?.result || visitorParkingSessions?.[status],
    page: parkingSessions?.page,
    refetch: visitorVehicleId
      ? refetchVisitorParkingSessions
      : refetchParkingSessions,
  }
}
