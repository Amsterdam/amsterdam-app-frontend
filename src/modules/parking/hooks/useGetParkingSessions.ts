import {skipToken} from '@reduxjs/toolkit/query'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetSecureParkingAccount} from '@/modules/parking/hooks/useGetSecureParkingAccount'
import {useParkingSessionsQuery} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'

export const useGetParkingSessions = (status: ParkingSessionStatus) => {
  const {secureParkingAccount, isLoading: isLoadingSecureParkingAccount} =
    useGetSecureParkingAccount()
  const currentPermit = useCurrentParkingPermit()
  const {data, isLoading, isError, refetch} = useParkingSessionsQuery(
    secureParkingAccount && currentPermit
      ? {
          accessToken: secureParkingAccount.accessToken,
          report_code: currentPermit.report_code.toString(),
          status,
          page_size: 100,
        }
      : skipToken,
  )

  return {
    isLoading: isLoadingSecureParkingAccount || isLoading,
    isError,
    parkingSessions: data?.result,
    page: data?.page,
    refetch,
  }
}
