import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {
  useParkingSessionsQuery,
  useVisitorParkingSessionsQuery,
} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'

export const useGetParkingSessions = (
  status: ParkingSessionStatus,
  visitorVehicleId?: string,
) => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const currentPermit = useCurrentParkingPermit()

  const {
    data: parkingSessions,
    isLoading: isLoadingParkingSessions,
    isError: isParkingSessionsError,
    refetch: refetchParkingSessions,
  } = useParkingSessionsQuery(
    secureParkingAccount && currentPermit && !visitorVehicleId
      ? {
          accessToken: secureParkingAccount.accessToken,
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
    secureParkingAccount && visitorVehicleId
      ? {
          accessToken: secureParkingAccount.accessToken,
          vehicle_id: visitorVehicleId,
          status,
        }
      : skipToken,
  )

  return {
    isLoading:
      isLoadingSecureParkingAccount ||
      isLoadingParkingSessions ||
      isLoadingVisitorParkingSessions,
    isError: isParkingSessionsError || isVisitorParkingSessionsError,
    parkingSessions:
      parkingSessions?.result || visitorParkingSessions?.parking_session,
    page: parkingSessions?.page,
    refetch: visitorVehicleId
      ? refetchVisitorParkingSessions
      : refetchParkingSessions,
  }
}
